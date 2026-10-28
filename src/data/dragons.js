import MilleProfile from "../images/Dragons/Milee_001/profile.png"
import CrimyProfile from "../images/Dragons/Crimy_002/profile.png"

const Milee_Idle_Images = import.meta.glob("../images/Dragons/Milee_001/idle/*.png", {
    query: "?url",
    import: "default",
    eager: true
})

const Milee_Idle_Frames = Object.entries(Milee_Idle_Images)
    .sort((a, b) => {
       return a[0].localeCompare(b[0])
    })
    .map(([key, value]) => {
        return value;
    })

const dragonData = [

    {
        Id: 1,
    
        element: "Water",
    
        names: {
            star4: "Milee",
            star5: "Milee",
            star6: "Milee",
        },

        images: {
            profile: MilleProfile,
            idle: {
                fps: 1,
                frames: Milee_Idle_Frames
            }
        },
    
        teamEffect: {
            element: "Water",
            boost: "HP",
            amount: 20,
        },
    
        skills: {
            skill1: {
                name: "WaterBall",
                imageId: "",
                desc: "",
                manaCost: 40
            }
        }
    },
    {
        Id: 2,
    
        element: "Fire",
    
        names: {
            star4: "Crimy",
            star5: "Crimsy",
            star6: "Crimson",
        },

        images: {
            profile: CrimyProfile,
            idle: {
                fps: 1,
                frames: Milee_Idle_Frames
            }
        },
    
        teamEffect: {
            element: "Fire",
            boost: "ATK",
            amount: 10,
        },
    
        skills: {
            skill1: {
                name: "FireBall",
                imageId: "",
                desc: "",
                manaCost: 40
            }
        }
    }
]

export default dragonData