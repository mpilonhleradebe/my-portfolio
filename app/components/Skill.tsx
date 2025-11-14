import React from 'react'

function Skill() {
    const skills = [
        { number: "01", title: "Software Engineering" },
        { number: "02", title: "Frontend" },
        { number: "03", title: "Backend" },
        { number: "04", title: "Mobile Apps" },
        { number: "05", title: "Data" },
        { number: "06", title: "Product & UX" },
        { number: "07", title: "Tooling" },
        { number: "08", title: "Animation" },
        { number: "09", title: "Color Grading" },
        { number: "10", title: "Music" }
    ];

    return (
        <div className="pt-[140px] pl-5 pr-5 w-full">
            {/* <img src="/images/test.jpg" alt="Skills" className="w-full h-auto absolute"/> */}
            <div className="flex flex-col md:flex-row md:justify-between gap-10">
                {/* Header */}
                <div className="md:w-[45%]">
                    <h1 className="text-neutral-900 text-[40px] whitespace-nowrap font-semibold">My Skillset</h1>
                    <h3 className="text-[#909090] text-[15px] pt-1">
                        This is the toolkit I've developed through the work, the failures, the lessons, and the things that inspired me. <br />
                        You may or may not be greeted by a voice. Don't be alarmed — it's just me.
                    </h3>
                </div>
                
                {/* Skills Grid */}
                <div className="flex flex-col md:w-[34%] h-[calc(100vh-180px)] overflow-y-auto mr-[10%]">
                    {skills.map((skill, index) => (
                        <div 
                            key={skill.number}
                            className={`w-[300px] h-[300px]  flex-shrink-0 border border-[#D8D8D8]  items-start justify-end pl-2 pt-1 hover:border-neutral-400 transition-colors ${
                                index % 2 === 0 ? 'self-end' : 'self-start'
                            }`}
                        >
                            <span className="text-neutral-900 text-[14px] font-jacquarda">{skill.number}</span>
                            <h2 className="text-neutral-900 text-xl font-semibold mt-[80%]">{skill.title}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Skill