import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { assets } from "../../assets/assets";
import { Button } from "@relume_io/relume-ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@relume_io/relume-ui";
import { ShopContext } from '../../context/ShopContext';
import { toast } from "react-toastify";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    const { navigate, token, setToken } = useContext(ShopContext);
    const location = useLocation();

    const handleLogin = () => {
        setIsMenuOpen(false);
        navigate('/login');
        window.scrollTo(0, 0);
    };

    const handleLogout = () => {
        setIsMenuOpen(false);
        localStorage.removeItem('token');
        setToken('');
        navigate('/login');
        window.scrollTo(0, 0);
        toast.success("Logout successful!");
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsMenuOpen(false);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isHomePage = location.pathname === '/';

    return (
        <nav className={`px-[5%] fixed w-full z-50 transition-all duration-300 ${isHomePage && !isScrolled && isDesktop ? 'bg-transparent' : 'bg-baby_powder shadow-md'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <img className="h-8 w-auto" src={assets.logo} alt="ChemCo Logo" />
                        </Link>
                        <div className="hidden md:block ml-10">
                            <div className="flex items-baseline space-x-4">
                                <Link to="/" onClick={() => {window.scrollTo(0, 0);}} className={`${isHomePage && !isScrolled && isDesktop ? 'text-white' : 'text-russian_violet'} hover:text-true_blue px-3 py-2 rounded-md text-base font-medium`}>
                                    Home
                                </Link>
                                <Link
                                    to="/products"
                                    onClick={() => {window.scrollTo(0, 0);}}
                                    className={`${isHomePage && !isScrolled && isDesktop ? 'text-white' : 'text-russian_violet'} hover:text-true_blue px-3 py-2 rounded-md text-base font-medium`}
                                >
                                    Products
                                </Link>
                                <Link
                                    to="/about"
                                    onClick={() => {window.scrollTo(0, 0);}}
                                    className={`${isHomePage && !isScrolled && isDesktop ? 'text-white' : 'text-russian_violet'} hover:text-true_blue px-3 py-2 rounded-md text-base font-medium`}
                                >
                                    About
                                </Link>
                                <Link
                                    to="/contact"
                                    onClick={() => {window.scrollTo(0, 0);}}
                                    className={`${isHomePage && !isScrolled && isDesktop ? 'text-white' : 'text-russian_violet'} hover:text-true_blue px-3 py-2 rounded-md text-base font-medium`}
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <Button onClick={() => handleNavigation('/cart')} variant="ghost" size="icon" className={`${isHomePage && !isScrolled && isDesktop ? 'text-white' : 'text-russian_violet'} hover:text-true_blue hover:bg-inherit`}>
                            <ShoppingCart className="h-5 w-5" />
                            <span className="sr-only">Shopping cart</span>
                            
                        </Button>
                        {!!token ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className={`${isHomePage && !isScrolled && isDesktop ? 'text-white' : 'text-russian_violet'} hover:text-true_blue hover:bg-inherit`}>
                                        <User className="h-5 w-5" />
                                        <span className="sr-only">User menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Link to="/dashboard" onClick={() => {window.scrollTo(0, 0);}}>Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link to="/orders" onClick={() => {window.scrollTo(0, 0);}}>Orders</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <Link>Logout</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button variant="ghost" className={`${isHomePage && !isScrolled && isDesktop ? 'text-white' : 'text-russian_violet'} font-medium hover:text-true_blue hover:bg-inherit`} onClick={handleLogin}>
                                Login
                            </Button>
                        )}
                    </div>
                    <div className="md:hidden flex items-center">
                        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${isHomePage && !isScrolled && isDesktop ? 'text-white' : 'text-russian_violet'}`}>
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/"
                            onClick={() => handleNavigation('/')}
                            className="text-russian_violet hover:text-true_blue block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            onClick={() => handleNavigation('/products')}
                            className="text-russian_violet hover:text-true_blue block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Products
                        </Link>
                        <Link
                            to="/about"
                            onClick={() => handleNavigation('/about')}
                            className="text-russian_violet hover:text-true_blue block px-3 py-2 rounded-md text-base font-medium"
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            onClick={() => handleNavigation('/contact')}
                            className="text-russian_violet hover:text-true_blue block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Contact
                        </Link>
                    </div>
                    <div className="pt-4 pb-3 border-t border-timber_wolf">
                        <div className="px-2 space-y-1">
                            <Button variant="ghost" size="sm" className="w-full justify-start text-russian_violet hover:text-true_blue hover:bg-inherit" onClick={() => handleNavigation('/cart')}>
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                Shopping Cart
                            </Button>
                            {!!token ? (
                                <>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start text-russian_violet hover:text-true_blue hover:bg-inherit"
                                        onClick={() => handleNavigation('/dashboard')}
                                    >
                                        Dashboard
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start text-russian_violet hover:text-true_blue hover:bg-inherit"
                                        onClick={() => handleNavigation('/orders')}
                                    >
                                        Orders
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start text-russian_violet hover:text-true_blue hover:bg-inherit"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start text-russian_violet hover:text-true_blue hover:bg-inherit"
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;