/* eslint-disable react/prop-types */
import Sidebar from '../common/Sidebar'

export default function Layout(props) {
    return (
        <div className='h-screen flex flex-row bg-red-100'>
            <Sidebar />
            {props.children}
        </div>
    )
}