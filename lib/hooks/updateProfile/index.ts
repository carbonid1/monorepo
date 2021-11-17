import gg from 'lib/generated';

export const useUpdateProfile = () => {
	const [mutate, { loading }] = gg.useUpdateProfileHook();

	const updateProfile = async (options: Parameters<typeof mutate>[0]) => {
		try {
			await mutate(options);
			alert('Profile updated successfully');
		} catch (err) {
			alert('Something went wrong');
		}
	};

	return {
		loading,
		updateProfile,
	};
};
