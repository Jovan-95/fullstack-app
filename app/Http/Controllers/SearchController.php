<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function globalSearch(Request $request)
    {
        $searchTerm = $request->query('global_serach');
        if ($searchTerm === null) {
        $searchTerm = '';
        }
        $searchTerm = trim($searchTerm);
        if ($searchTerm === '') {
        return response()->json([
        'message' => 'Query param "global_serach" is required.'
        ], 422);
}   

        
        $perPage = (int) $request->query('per_page', 10);
        $results = User::search($searchTerm)->paginate($perPage);

         $results->setCollection(
        $results->getCollection()->filter(function (User $user) {
            return $user->id !== auth()->id(); 
        })
    );

       
        return response()->json([
            'query' => $searchTerm,
            'data'  => $results->map(fn (User $user) => [
                'id'       => $user->id,
                'name'     => $user->name,
                'email'    => $user->email,
                'username' => $user->username,
            ]),
            'meta'  => [
                'current_page' => $results->currentPage(),
                'per_page'     => $results->perPage(),
                'total'        => $results->total(),
                'last_page'    => $results->lastPage(),
            ],
        ]);
    }
}
