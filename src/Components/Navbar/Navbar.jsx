import { React, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import { IoPeopleCircleOutline, IoExitOutline } from "react-icons/io5";

function NavbarAdmin() {
    const { logOutUser, user } = useContext(AuthContext);


    return (
        <aside className="h-screen fixed top-0 overflow-y-auto w-60 py-6 px-4 bg-base-200 ">
            <div className="items-center flex flex-col gap-y-2">

                {user ? <h2 className="font-bold text-lg">{user.firstName} {user.lastName}</h2> : <div className="skeleton h-4 w-full"></div>}

                {user ? <span className="text-sm text-primary">{user.email}</span> : <div className="skeleton h-4 w-full"></div>}
            </div>
            <div className="divider my-1"></div>
            <ul className="menu px-0 gap-y-2">
                <li>
                    <Link to={""}>
                        <IoPeopleCircleOutline className="w-5 h-5" />
                        Users
                    </Link>
                </li>
                <div className="divider my-1"></div>
                <li onClick={() => logOutUser()}>
                    <Link to={""} className="btn btn-primary">
                        <IoExitOutline className="w-5 h-5" />
                        Log Out
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default NavbarAdmin;
