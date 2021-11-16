import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/client';
import { CustomHead } from 'lib/components/CustomHead';
import { ROUTE } from 'lib/consts/routes';
import { useUpdateProfile } from 'lib/hooks/updateProfile';
import useProfile from 'lib/hooks/useProfile';

const SettingsPage: NextPage = () => {
	const { profile } = useProfile();
	const { updateProfile } = useUpdateProfile();

	return (
		<>
			<CustomHead title="Settings" />
			<button onClick={() => updateProfile({ variables: { name: 'hello' } })}>Settings</button>
			<pre>{JSON.stringify(profile, null, 2)}</pre>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const session = await getSession(context);

	if (!session) {
		return {
			props: {},
			redirect: {
				destination: `/${ROUTE.signIn}`,
			},
		};
	}

	return {
		props: {},
	};
};

export default SettingsPage;
