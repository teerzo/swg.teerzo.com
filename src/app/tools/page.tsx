import Link from "next/link"
import Image, { StaticImageData } from "next/image"

import imgEnt from '../../../public/images/img-ent.png'
import imgGCW from '../../../public/images/img-gcw.png'


export default function Page() {


    return (

        <div className="w-full mx-auto max-w-7xl p-5">
            {/* <h1>Tools</h1> */}

            <div className="flex flex-row flex-wrap justify-center gap-1">
                <Card link={'tools/ent-buff'} title="Entertainer buff builder" description={'Entertainer buff builder'} image={imgEnt} />
                <Card link={'tools/expertise'} title="Expertise Calculator" description={'Expertise Calculator'} image={imgGCW} />
                <Card link={'tools/gcw'} title="GCW Calculator" description={'GCW Point Calculator'} image={imgGCW} />
                <Card link={'tools/timers'} title="Invasion timers" description={'Invasion and Flashpoint timers'} image={imgGCW} />
            </div>
        </div>
    )
}

function Card({ link, title, description, image }: { link: string, title: string, description: string, image: StaticImageData | null }) {

    return (
        <Link href={link}>
            <div className="flex flex-col justify-between h-full bg-gray-100 shadow-xl border border-base-200 hover:bg-gray-200">
                <figure>
                    {image !== null ?
                        <Image
                            src={image}
                            alt="Picture of the author"
                            width={300}
                            height={200}
                            placeholder="blur"
                            className="m-0"
                        />
                        :
                        <> </>
                    }
                </figure>

                <div className="p-5">
                    <h2 className="text-lg">{title}</h2>
                    {/* <p>{description}</p> */}
                    <div className="card-actions justify-end">
                        {/* <button className="btn btn-primary">Go</button> */}
                    </div>
                </div>
            </div>
        </Link >
    )
}