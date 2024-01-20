import Button from "./common/Button";
import { useCurrentUser } from "./contexts";
import { Link } from "react-router-dom";

function SplashPage() {
    const { currentUser } = useCurrentUser();

    return (
        <div id="grid-container" className="grid bg-neutral-100 lg:grid-cols-2
         2xl:grid-cols-5">
            <div id="container" className="px-8 py-12 max-w-md mx-auto sm:max-w-xl
             lg:px-12 lg:py-24 lg:max-w-full xl:mr-0 2xl:col-span-2">
                <div className="xl:max-w-xl">
                    <img src="https://picsum.photos/id/434/4000/2667" alt="forest lake with mountains in the background"
                        className="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64
                         sm:w-full sm:object-cover object-top lg:hidden" />
                    <h2 className="mt-6 text-2xl font-bold text-neutral-800
                    sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
                        Find a beautiful outdoor space for your next event.
                        <br></br>
                        <span className="text-green-600">
                            Share your space with the world.
                        </span>
                    </h2>
                    <p className="mt-2 text-netural-600 sm:mt-4 sm:text-xl">
                        ShareB&B is an outdoor space hosting service. Find a backyard, pool, or beach for your next birthday party, wedding, or date night. Host your own space and share your own slice of the beautiful outdoors.
                    </p>
                    <div className="mt-4 sm:mt-6">
                        <Link to={currentUser ? "listings/new" : "/signup"} className="inline-block">
                            <Button color="green">
                                {currentUser ? "Share your space" : "Sign up today"}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block relative 2xl:col-span-3">
                <img className="absolute inset-0 h-full w-full object-cover object-center"
                    src="https://picsum.photos/id/434/4000/2667" alt="forest lake with mountains in the background" />
            </div>
        </div>

    );
}

export default SplashPage;
