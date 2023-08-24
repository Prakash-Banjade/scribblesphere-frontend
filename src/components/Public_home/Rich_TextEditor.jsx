import React, { useCallback } from 'react'
import textEditor from '../../assets/textEditor.png'
import { BiText, BiImages } from 'react-icons/bi'
import { BsTextLeft, BsCodeSlash } from 'react-icons/bs'


const info = [
    {
        title: 'Normal Text with Headings',
        desc: 'Create and format text content effortlessly using various heading levels, allowing for clear organization and hierarchy within your text.',
        icon: <BiText />,
    },
    {
        title: 'Image, Audio, Video',
        desc: 'Seamlessly embed multimedia elements such as images, audio clips, and videos to enhance your content and engage your audience effectively.',
        icon: <BiImages />,
    },
    {
        title: 'Alignment, Indents, Text Formatting',
        desc: "Customize your text's appearance with alignment options, indents for improved readability, and a variety of text formatting choices like bold, italics, and more.",
        icon: <BsTextLeft />,
    },
    {
        title: 'Links, Formulae, Code',
        desc: ' Enhance interactivity by adding hyperlinks to external resources, insert mathematical formulas for educational or technical content, and include code snippets with proper formatting for programming examples.',
        icon: <BsCodeSlash />,
    },
]

const SingleInfoContent = (data) => {
    return (
        <div className="flex flex-col gap-2">
            <span className="p-2 rounded-md bg-gray-300 text-xl border text-gray-800 w-fit" style={{borderColor: 'var(--line-color)'}}>
                {data.info.icon}
            </span>

            <h3 className="font-bold text-lg mt-3" style={{ color: 'var(--text-200)' }}>{data.info.title}</h3>
            <p className="leading-6 text-sm" style={{ color: 'var(--text-400)' }}>{data.info.desc}</p>
        </div>
    )
}

const Rich_TextEditor = () => {
    return (
        <section className="page_section p-2.5">
            <header className="pub_heading" data-aos="fade-up" data-aos-offset="150">
                <h2 className='text-center font-semibold capitalize'>provided with rich text editor </h2>
                <p className="text-center text-xs mt-1" style={{ color: 'red !important' }}>Powered by <a href="https://quilljs.com/" rel="noopener noreferrer" target="_blank" className="hover:underline text-blue-600">Quill.js</a></p>
            </header>

            <div className="flex flex-wrap gap-12 mt-[50px] relative">
                <section className="grow shrink basis-[400px]" data-aos="fade-left" data-aos-offset="150">

                    <div className='flex flex-col gap-[55px] pl-2 font-medium text-lg' style={{ color: 'var(--text-200)' }}>

                        {
                            info.map((data, id) => <SingleInfoContent info={data} key={id} />)
                        }
                    </div>

                </section>

                <section className="grow shrink basis-[400px] relative p-5 h-fit" data-aos="fade-right" data-aos-offset="150">
                    <div className="img_wrapper rounded-md h-[90%] w-[93%] shadow-xl absolute top-0 left-0" style={{ background: "linear-gradient(to bottom right, var(--gradient-variant-2-primary),var(--gradient-variant-2-secondary))" }}>
                    </div>
                    <img src={textEditor} alt="text editor" className="select-none max-w-full shadow-xl block rounded-md relative z-20" />
                </section>
                <div className="background" data-aos="zoom-in" style={{ background: "radial-gradient(var(--gradient-variant-2-primary), var(--gradient-variant-2-secondary)), transparent"}}>
                    {/* a lighten shadow - manipulated using css */}
                </div>
            </div>

        </section>
    )
}

export default Rich_TextEditor
