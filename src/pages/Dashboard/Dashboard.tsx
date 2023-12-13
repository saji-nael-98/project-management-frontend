import { Outlet } from "react-router-dom"
import { DashboardWrapper } from "shared"

export const Dashboard = () => {
    return (
        <DashboardWrapper>
            <Outlet />
        </DashboardWrapper>
    )
}
