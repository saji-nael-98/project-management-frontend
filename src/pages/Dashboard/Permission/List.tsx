import { PermissionList } from 'modules/Permission/presentation'
import { List } from 'shared/List'
const PermissionListPage = () => {
    return (
        <List title='Permissions' createPath='create'>
            <PermissionList />
        </List>
    )
}
export const Component = PermissionListPage
