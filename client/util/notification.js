const notification = (title, body, icon, duration = 3000) => {
  if (window.Notification && window.Notification.permission === 'granted') {
    const n = new window.Notification(
        title,
      {
        icon,
        body
      },
    )
    n.onclick = function () {
      window.blur()
      window.focus()
      this.close()
    }
    setTimeout(n.close.bind(n), duration)
  }
}

export default notification