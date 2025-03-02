export const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email address is already in use. Please try another one.';
        case 'auth/invalid-email':
            return 'The email address is not valid.';
        case 'auth/weak-password':
            return 'Password is too weak. Please choose a stronger password.';
        case 'auth/user-not-found':
            return 'No user found with this email address.';
        case 'auth/wrong-password':
            return 'The password is incorrect. Please try again.';
        default:
            return 'An error occurred.\nPlease make sure to fill in all required fields and try again.';
    }
};
