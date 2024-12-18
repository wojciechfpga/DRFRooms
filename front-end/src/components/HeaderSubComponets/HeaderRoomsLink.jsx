import Link from "next/link";

const HeaderRoomsLink = () => {
    return (
        <div className="flex space-x-4">
            <Link href="/rooms">
                <h2 className="text-white py-2 px-4 border-none">
                    Our rooms
                </h2>
            </Link>

            <Link href="/roomsadmin">
                <h2 className="text-white py-2 px-4 border-none">
                    Admin rooms
                </h2>
            </Link>
        </div>
    );
}

export default HeaderRoomsLink;
