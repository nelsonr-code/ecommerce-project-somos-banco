import type { FormEvent } from "react";
import { useState } from "react";

export const Home = () => {

    const [userAuthenticated, setUserAuthenticated] = useState("");

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, password } = e.target as typeof e.target & {
            email: { value: string }
            password: { value: string }
        };

        let opts = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                login: email.value,
                password: password.value
            })
        }

        await fetch('/login', opts)
            .then(resp => {
                if (!resp.ok) setUserAuthenticated("user or password invalidate")

                return resp.json();
            })
            .then(content => {
                console.log(content.message);
                setUserAuthenticated(content.message);
            })

    }

    return (
        <section className="grid bg-cover h-screen w-full grid-cols-2 flex items-center" style={{ backgroundImage: 'url(https://i.postimg.cc/0QfbZbfr/8-SOXq-Ez-MTJung-Ra-BJj-Opd2vo5-Ibw-Syr-T6i-SZOi5-I.jpg)' }}>
            <div className="flex flex-col">
                <div className="bg-gray-900 divide-y text-white shadow-2xl mt-10">
                    <p className="text-6xl py-5 ml-10">Somos Banco</p>
                    <p className="text-lg pt-3 mb-3 ml-10">Tu gente, tu banco</p>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="bg-white bg-opacity-75 rounded border shadow-md p-10 my-5">
                    <div className="">
                        <form onSubmit={e => { handleFormSubmit(e) }}>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    // className="w-full py-1 text-gray-700 bg-gray-300 rounded focus:outline-none border border-transparent"
                                    className="w-full py-1 px-2 bg-gray-300 rounded border border-transparent focus:outline-none focus:bg-white focus:ring-2 focus:border-transparent"
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="username"
                                    placeholder="your email"
                                    required
                                />
                            </div>
                            <div className="mt-5">
                                <label htmlFor="password">Password</label>
                                <input
                                    // className="w-full py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                    className="w-full py-1 px-2 bg-gray-300 rounded border border-transparent focus:outline-none focus:bg-white focus:ring-2 focus:border-transparent"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="your password"
                                />
                            </div>
                            <div className="flex flex-col justify-center items-center mt-4">
                                <button
                                    className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                                    type="submit">
                                    Login
                                </button>
                                <div className="mt-2">
                                    {userAuthenticated}
                                </div>
                                <p className="my-5 text-xs font-medium text-center text-gray-700">
                                    Do you not have account?
                                    <br />
                                    <a href="/" className="gray-900 hover:text-purple-900">Sign up</a>
                                    {/* and
                                    <a href="/" className="text-purple-700 hover:text-purple-900">Privacy Policy</a>. */}
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )

}

export default Home;