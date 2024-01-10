const allowPages = ['/login', '/registration', '/new-password', '/recover-password', '/recover-password-step-2', '/registration-pending', '/home'];

export const checkPages = (): boolean => {
  const path = window.location.pathname
  const success = allowPages.filter(page => path.includes(page))
  return success.length === 0
}
