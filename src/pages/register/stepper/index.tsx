import React, { Component } from 'react'
import InputForm from '../../../components/inputFormRegister'
import { handleFormSignup } from '../../../hooks/useHandleFormSubmit'

export default class Signup extends Component {

    render() {

        return (
            <div className="flex p-1 py-12 bg-white place-content-center">
                <div className="max-w-lg overflow-hidden border border-gray-200 rounded-lg">
                    <form onSubmit={e => { handleFormSignup(e) }} className="w-full max-w-lg">
                        <div className="p-10 pb-6">
                            <div className="flex flex-wrap mb-6 -mx-3">
                                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                                        htmlFor="grid-first-name">
                                        First Name
                                    </label>
                                    <input
                                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                                        id="grid-first-name"
                                        type="text"
                                        name="name"
                                        placeholder="Jane" />
                                </div>
                                {/* <div className="w-full px-3 md:w-1/2">
                                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                                        htmlFor="grid-last-name">
                                        Last Name
                                    </label>
                                    <input
                                        className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-last-name"
                                        type="text"
                                        placeholder="Doe" />
                                </div> */}
                            </div>
                            <div className="flex flex-wrap -mx-3">
                                <div className="w-full px-3 mb-6">
                                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                                        htmlFor="grid-email">
                                        Email
                                    </label>
                                    <input
                                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-email"
                                        type="email"
                                        name="email"
                                        placeholder="janedoe@example.com" />
                                </div>
                                <div className="w-full px-3 mb-6">
                                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                                        htmlFor="grid-password">
                                        Password
                                    </label>
                                    <input
                                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-password"
                                        type="password"
                                        name="password"
                                        placeholder="***********" />
                                </div>
                                <div className="w-full px-3 mb-6">
                                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                                        htmlFor="grid-number">
                                        Phone number
                                    </label>
                                    <input
                                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-email"
                                        type="text"
                                        name="phone"
                                        placeholder="+00 XXX XXX XXXX" />
                                </div>
                            </div>

                        </div>
                        <div className="flex items-center justify-between p-5 text-center bg-gray-200">
                            <div className="relative flex flex-col items-start mr-1 text-sm">
                                <span className="mr-1 text-gray-500">Already have an account?</span>
                                <a href="/" className="block font-medium text-indigo-600 underline">Login Here</a>
                            </div>
                            <button type="submit"
                                className="inline-flex items-center px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
                                Register Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
