import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import { Button } from '@/components/ui/button'

export default async function Home() {
  const { getUser } = getKindeServerSession()
  const session = await getUser()

  return (
    <div className="p-6 space-x-2">
      {session ? (
        <LogoutLink>
          <Button>Logout</Button>
        </LogoutLink>
      ) : (
        <>
          <RegisterLink>
            <Button>Register</Button>
          </RegisterLink>
          <LoginLink>
            <Button>Login</Button>
          </LoginLink>
        </>
      )}
    </div>
  )
}
