import Link from "next/link"
import Image, { StaticImageData } from "next/image"

import imgGCW from '../../../public/images/img-gcw.png'


export default function Page() {


    return (
        <div>
            {/* <h1>Tools</h1> */}

            <div className="flex flex-row flex-wrap justify-center gap-1">
                <Card link={'tools/ent-buff'} title="Ent buff builder" description={'blah blah blah'} image={imgGCW} />
                <Card link={'tools/expertise'} title="Expertise calculator" description={'blah blah blah'} image={imgGCW} />
                <Card link={'tools/gcw'} title="GCW calculator" description={'blah blah blah'} image={imgGCW} />
                <Card link={'tools/timers'} title="Invasion timers" description={'blah blah blah'} image={imgGCW} />

            </div>
        </div>
    )
}

function Card({ link, title, description, image }: { link: string, title: string, description: string, image: StaticImageData | null }) {

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl border-2 border-base-200">
            <figure>
                {image !== null ?
                    <Image
                        src={image}
                        alt="Picture of the author"
                        // width={40}
                        // height={40}
                        placeholder="blur"
                        className="m-0"
                    />

                    :
                    <> </>
                }
            </figure>

            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <Link href={link}>
                        <button className="btn btn-primary">Go</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}