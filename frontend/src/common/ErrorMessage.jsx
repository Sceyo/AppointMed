/* eslint-disable react/prop-types */
export default function ErrorMessage({ message }) {
  //  Appears if message exists and not empty
  if (message) {
    return (
      <div className='w-full py-2'>
        <p className='text-red-500'>{message}</p>
      </div>
    );
  }
}