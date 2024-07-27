import React from 'react';

const PrayerTimeLeft = () => {
    return (
        <div className="w-full h-full grid grid-cols-2 grid-rows-3 gap-4">
            {/* Beispiel-Element */}
            <div className="border-7 border-white rounded-2xl bg-transparent p-4 flex items-center justify-between">
                <div className="flex flex-col mt-16">
                    <span className="text-black text-6xl text-center font-bold">İmsak</span>
                    <span className="text-black text-4xl text-center mt-5 font-bold">الصلاة المغرب</span>
                </div>
                <span className="text-black text-8xl font-bold">04:34</span>
            </div>
            <div className="border-7 border-white rounded-2xl bg-transparent p-4 flex items-center justify-between">
                <div className="flex flex-col mt-16">
                    <span className="text-black text-6xl text-center font-bold">İkindi</span>
                    <span className="text-black text-4xl text-center mt-5 font-bold">الصلاة المغرب</span>
                </div>
                <span className="text-black text-8xl font-bold">04:34</span>
            </div>
            <div className="border-7 border-white rounded-2xl bg-transparent p-4 flex items-center justify-between">
                <div className="flex flex-col mt-16">
                    <span className="text-black text-6xl text-center font-bold">Güneş</span>
                    <span className="text-black text-4xl text-center mt-5 font-bold">الصلاة المغرب</span>
                </div>
                <span className="text-black text-8xl font-bold">04:34</span>
            </div>
            <div className="border-7 border-white rounded-2xl bg-transparent p-4 flex items-center justify-between">
                <div className="flex flex-col mt-16">
                    <span className="text-black text-6xl text-center font-bold">Akşam</span>
                    <span className="text-black text-4xl text-center mt-5 font-bold">الصلاة المغرب</span>
                </div>
                <span className="text-black text-8xl font-bold">04:34</span>
            </div>
            <div className="border-7 border-white rounded-2xl bg-transparent p-4 flex items-center justify-between">
                <div className="flex flex-col mt-16">
                    <span className="text-black text-6xl text-center font-bold">Öğle</span>
                    <span className="text-black text-4xl text-center mt-5 font-bold">الصلاة المغرب</span>
                </div>
                <span className="text-black text-8xl font-bold">04:34</span>
            </div>
            <div className="border-7 border-white rounded-2xl bg-transparent p-4 flex items-center justify-between">
                <div className="flex flex-col mt-16">
                    <span className="text-black text-6xl text-center font-bold">Yatsı</span>
                    <span className="text-black text-4xl text-center mt-5 font-bold">الصلاة المغرب</span>
                </div>
                <span className="text-black text-8xl font-bold">04:34</span>
            </div>
        </div>
    );
};

export default PrayerTimeLeft;

/*

<div className="border-7 border-white rounded-2xl bg-transparent p-4"></div>
<div className="border-7 border-white rounded-2xl bg-transparent p-4"></div>
<div className="border-7 border-white rounded-2xl bg-transparent p-4"></div>
<div className="border-7 border-white rounded-2xl bg-transparent p-4"></div>
<div className="border-7 border-white rounded-2xl bg-transparent p-4"></div>
*/