function Dashboard() {
    return (
        <div className="dashboard">
            {/* Header sekcija */}
            <header className="dashboard__header">
                <h1 className="dashboard__title">Admin Dashboard</h1>
                <p className="dashboard__subtitle">
                    Overview of the platform statistics
                </p>
            </header>

            {/* Stat kartice */}
            <section className="dashboard__stats">
                <div className="stat-card">
                    <h3 className="stat-card__number">1,240</h3>
                    <p className="stat-card__label">Active Users</p>
                </div>
                <div className="stat-card">
                    <h3 className="stat-card__number">320</h3>
                    <p className="stat-card__label">New Signups</p>
                </div>
                <div className="stat-card">
                    <h3 className="stat-card__number">$12,450</h3>
                    <p className="stat-card__label">Revenue</p>
                </div>
            </section>

            {/* Grafički prikaz */}
            <section className="dashboard__charts">
                <div className="chart-card">
                    <h3 className="chart-card__title">User Growth</h3>
                    <div className="chart-card__placeholder">[Chart here]</div>
                </div>
                <div className="chart-card">
                    <h3 className="chart-card__title">Revenue</h3>
                    <div className="chart-card__placeholder">[Chart here]</div>
                </div>
            </section>

            {/* Aktivnosti */}
            <section className="dashboard__activities">
                <h3 className="dashboard__section-title">Recent Activities</h3>
                <ul className="activities-list">
                    <li className="activities-list__item">
                        New user registered
                    </li>
                    <li className="activities-list__item">
                        Admin updated settings
                    </li>
                    <li className="activities-list__item">
                        5 new comments on blog posts
                    </li>
                </ul>
            </section>
        </div>
    );
}

export default Dashboard;
