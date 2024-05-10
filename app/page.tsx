import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export default function Home() {
  const data = [
    {id: 1, name: "Dawid Bączkiewicz", age: 21, position: "Junior Frontend Developer", salary: 4500},
    {id: 2, name: "John Doe", age: 25, position: "Senior Backend Developer", salary: 6000},
    {id: 3, name: "Alice Smith", age: 30, position: "Product Manager", salary: 7000},
    {id: 4, name: "Bob Johnson", age: 28, position: "UI/UX Designer", salary: 5500},
    {id: 5, name: "Emma Brown", age: 23, position: "Data Analyst", salary: 5000},
    {id: 6, name: "Michael Wilson", age: 27, position: "Software Engineer", salary: 6500},
    {id: 7, name: "Sarah Williams", age: 29, position: "Marketing Specialist", salary: 4800},
    {id: 8, name: "David Lee", age: 32, position: "Project Manager", salary: 7200},
    {id: 9, name: "Laura Taylor", age: 26, position: "QA Engineer", salary: 5200},
    {id: 10, name: "Daniel Clark", age: 31, position: "DevOps Engineer", salary: 6800},
    {id: 11, name: "Michael Wilson", age: 27, position: "Software Engineer", salary: 6500},
    {id: 12, name: "Sarah Williams", age: 29, position: "Marketing Specialist", salary: 4800},
    {id: 13, name: "David Lee", age: 32, position: "Project Manager", salary: 7200},
    {id: 14, name: "Laura Taylor", age: 26, position: "QA Engineer", salary: 5200},
    {id: 15, name: "Daniel Clark", age: 31, position: "DevOps Engineer", salary: 6800}
  ];


  return (
    <div className={"flex justify-center p-4 text-white"}>
      <div className={"w-screen bg-stone-950 text-white h-screen overflow-auto"}>
        <Table className={"border border-white"}>
          <TableHeader>
            <TableRow>
              {Object.keys(data[0]).map((key, index) => {
                return (
                  <TableHead key={index} className={"text-white hover:bg-stone-900"}>{key}</TableHead>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => {
              return (
                <TableRow key={index}>
                  {Object.values(row).map((value, index) => {
                    return (
                      <TableCell key={index} className={"border-white border"}>{value}</TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
