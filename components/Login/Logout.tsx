import { Button } from 'antd'

import { useAppState } from '../../provider/AppState'
import { useRouter } from 'next/router';

export default function Page() {
	const router = useRouter()
	const { loggedInUser, setLoggedInUser } = useAppState()

  if (loggedInUser === null) return null;

	const logout = () => {
		setLoggedInUser(null)
		router.push('/')
	}

	return (
    <Button type="primary" danger onClick={logout}>logout</Button>
	)
}
