export interface Specials{
  _id: string,
  specName: string,
}

export interface Groups{
  _id: string,
  specId: string,
  groupName: string,
  courseNumber: number
}

export interface Schedules{
  _id: string,
  groupId: string,
  chisl: boolean,
  pairs: [
    {
      day: string,
      pair1: string,
      pair2: string,
      pair3: string,
      pair4: string,
      pair5: string
    },
    {
      day: string,
      pair1: string,
      pair2: string,
      pair3: string,
      pair4: string,
      pair5: string
    },
    {
      day: string,
      pair1: string,
      pair2: string,
      pair3: string,
      pair4: string,
      pair5: string
    },
    {
      day: string,
      pair1: string,
      pair2: string,
      pair3: string,
      pair4: string,
      pair5: string
    },
    {
      day: string,
      pair1: string,
      pair2: string,
      pair3: string,
      pair4: string,
      pair5: string
    },
    {
      day: string,
      pair1: string,
      pair2: string,
      pair3: string,
      pair4: string,
      pair5: string
    }
  ]
}

export interface Pairs{
  day: string,
  pair1: string,
  pair2: string,
  pair3: string,
  pair4: string,
  pair5: string
}
