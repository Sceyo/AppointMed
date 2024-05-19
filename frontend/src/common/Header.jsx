import { FaSearch } from 'react-icons/fa';

export default function Header({ title, searchType }) {
    return (
        <div className='inline-flex flex-row p-16 pb-8' id='dashboard-header'>
          <div className='flex flex-1'>
            <h1 className='text-3xl font-bold'>{title}</h1>
          </div>
          { searchType && (
            <div className='flex flex-row' id='dashboard-search'>
                <FaSearch
                style={{
                    position: 'absolute',
                    marginTop: '6px',
                    padding: '4px',
                    marginLeft: '10px',
                    pointerEvents: 'none',
                }}
                size={22}
                />
                <input
                className='flex flex-row items-center bg-slate-300 rounded-md pl-10'
                placeholder='Search...'
                />
            </div>
          )}
        </div>
    )
}