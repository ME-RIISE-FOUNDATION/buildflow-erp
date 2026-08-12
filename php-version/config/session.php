<?php
// Session Configuration
session_start();

// Super Admin credentials (change these in production!)
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'Admin@123'); // Change this!

// Check if user is logged in
function isLoggedIn() {
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

// Login function
function login($username, $password) {
    if ($username === ADMIN_USERNAME && $password === ADMIN_PASSWORD) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $username;
        $_SESSION['login_time'] = time();
        return true;
    }
    return false;
}

// Logout function
function logout() {
    session_unset();
    session_destroy();
}

// Protect pages - redirect to login if not logged in
function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: /login.php');
        exit();
    }
}
?>
