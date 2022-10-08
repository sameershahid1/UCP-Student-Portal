export const Data=[
    //Courses List
    {
        Semester:1,
        CourseCode:"CH123",
        CourseTitle:"PF",
        Add:true,
        Sections:[
       //Course Sections list
            {
                Section:"E1",
                Status:"Open",
                Capacity:50,
                CurrentCapacity:10,
                Days:[
                    {
                      StartTime:"08:00AM",
                      EndTime:"09:20AM",
                      Day:"Monday"
                    },
                    {
                      StartTime:"08:00AM",
                      EndTime:"09:20AM",
                      Day:"Wednesday"
                    }
                ]
            },
            {
                Section:"E2",
                Status:"Open",
                Capacity:50,
                CurrentCapacity:30,
                Days:[
                    {
                      StartTime:"010:00AM",
                      EndTime:"11:20AM",
                      Day:"Tuesday"
                    },
                    {
                      StartTime:"08:00AM",
                      EndTime:"09:20AM",
                      Day:"Friday"
                    }
                ]
            }            
        ]
    }
];