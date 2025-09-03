function Courses() {
    return (
        <div className="courses-page">
            {/* <!-- Header --> */}
            <div className="courses-header">
                <h1 className="courses-title">Available Courses</h1>
                <div className="courses-search">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="courses-search-input"
                    />
                    <button className="courses-search-btn">Search</button>
                </div>
            </div>

            {/* <!-- Filters --> */}
            <div className="courses-filters">
                <select className="courses-filter">
                    <option value="">All Categories</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                </select>

                <select className="courses-sort">
                    <option value="newest">Newest</option>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Top Rated</option>
                </select>
            </div>

            {/* <!-- Course List --> */}
            <div className="courses-list">
                <div className="course-card">
                    <img
                        src="https://via.placeholder.com/300x180"
                        alt="Course"
                        className="course-image"
                    />
                    <div className="course-content">
                        <h2 className="course-title">React for Beginners</h2>
                        <p className="course-description">
                            Learn the fundamentals of React, including
                            components, props, and hooks.
                        </p>
                        <div className="course-meta">
                            <span className="course-category">Programming</span>
                            <span className="course-duration">12h</span>
                        </div>
                        <button className="course-btn">View Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;
