import useAuth from "@hooks/useAuthContext";

const Profile = () => {
    const {logout, setIsLoggingOut} = useAuth(); // Assuming useToken provides token management, though not used here

    const simulateLogOut = () => {
        logout(); // Remove token from local storage
        console.log("User logged out");
        setIsLoggingOut(true); // Set logging out state
    }

    return (
        <div>
            <h1>My Profile</h1>
            <p>This is the profile page.</p>
            <button onClick={simulateLogOut}>Cerrar sesión</button>
        </div>
    );
}

export default Profile;