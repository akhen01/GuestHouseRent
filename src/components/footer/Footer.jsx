import React from 'react'
import {Link} from "react-router-dom"

function Footer() {
  return (
    <section className="flex overflow-hidden py-10 bg-yellow-100 border border-t-2 rounded-t-xl">
        <div className="z-10 mx-auto max-w-7xl px-4">
            <div className="m-2 flex flex-wrap">
                <div className="w-full pt-6  lg:w-8/12">
                    <div className="flex h-full sm:flex-col flex-row justify-start">
                        <div className="mb-4 mr-10 sm:mr-0 inline-flex ">
                            <img src="#" alt="Logo" />
                        </div>
                        <div>
                            <p className=" text-sm text-gray-600">
                                &copy; Copyright 2024. All Rights Reserved by Netsa Lesan.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full p-6 md:w-1/2 lg:w-4/12">
                    <div className="h-full text-center">
                        <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                            Support
                        </h3>
                        <ul>
                            <li className="mb-4">
                                <Link
                                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                    to="/"
                                >
                                    Contact Us <br /><br />Telegram:{"123456"} <br />Phone:{"123456"} <br />Instagram:{"123456"}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                    to="/"
                                >
                                    Customer Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Footer