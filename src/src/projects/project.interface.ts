export default interface Project {
    id : number
    name : string
    image : string
    description : string
    skills : Array<string>
    link : string | null
    solo : boolean
    github : string | null
  }