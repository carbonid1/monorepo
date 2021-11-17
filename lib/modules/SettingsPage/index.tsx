import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/client';
import { useForm } from 'react-hook-form';
import { CustomHead } from 'lib/components/CustomHead';
import { ROUTE } from 'lib/consts/routes';
import { useUpdateProfile } from 'lib/hooks/updateProfile';
import useProfile from 'lib/hooks/useProfile';
import { TextField } from 'lib/components/@controls/TextField';

interface FormData {
	name: string | null;
}

const SettingsPage: NextPage = () => {
	const { profile } = useProfile();
	const { updateProfile } = useUpdateProfile();
	const { register, handleSubmit } = useForm<FormData>({ defaultValues: { name: profile?.name } });
	const onSubmit = handleSubmit(variables => {
		updateProfile({ variables });
	});

	return (
		<>
			<CustomHead title="Settings" />

			<pre>{JSON.stringify(profile, null, 2)}</pre>

			<form onSubmit={onSubmit} className="mt-10" noValidate={false}>
				<TextField
					label="Name"
					inputProps={{
						id: 'name',
						type: 'text',
						...register('name', { required: true }),
					}}
				/>
				<button type="submit">Submit</button>
			</form>
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
