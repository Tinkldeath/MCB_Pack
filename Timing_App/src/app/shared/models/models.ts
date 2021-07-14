export interface Special{
  _id: string,
  specName: string
}

export interface Group{
  _id: string,
  specId: string,
  courseNumber: number,
  groupName: string
}

export interface Schedule{
  _id: string,
  chisl: boolean,
  groupId: string,
  pairs: Pair[];
}

export interface Pair{
  day:string,
  pair1: string,
  pair2: string,
  pair3: string,
  pair4: string,
  pair5: string
}
