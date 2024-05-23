/* eslint-disable react/prop-types */
import Sidebar from '../common/Sidebar'

export default function Layout(props) {
    return (
        <div className='h-screen flex flex-row bg-slate-50'>
            <Sidebar />
            <div className='flex-grow flex-col'>
                {props.children}
            </div>
        </div>
    )
}