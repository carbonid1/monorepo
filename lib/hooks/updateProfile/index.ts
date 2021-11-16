import gg from 'lib/generated';

export const useUpdateProfile = () => {
	const [mutate] = gg.useUpdateProfileHook();

	return {
		updateProfile: mutate,
	};
};
