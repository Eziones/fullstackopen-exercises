const Notification = ({message}) => {
  if(message === null) {
    return
  }
  
  return (
    <div className={message.type ? message.type : 'success'}>
      {message.message}
    </div>
  )
}

export default Notification