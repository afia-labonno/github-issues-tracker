
const allTabBtn = document.getElementById("all-tab-btn");


const loadIssues = async () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const response = await fetch(url);
    const data = await response.json();
    const issues = data.data ;
    displayIssues(issues);

}

const displayIssues = (issues) => {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    const grid = document.createElement("div");
    grid.classList.add("grid", "grid-cols-4", "gap-4");

    issues.forEach(issue => {

        const div = document.createElement('div');
        div.classList.add("card", "bg-base-100", "border", "border-base-300", "border-t-4", "shadow-md", "p-4" , "flex" , "flex-col", "h-full");

        const status = issue.status.toLowerCase();
        const priority = issue.priority.toLowerCase();

        // top border color
        if(status === "open"){
            div.classList.add("border-t-green-500");
        }
        else if(status=== "closed"){
            div.classList.add("border-t-purple-600");
        }

        div.innerHTML = `
       
                        <div class="flex justify-between">
                            <span class="status w-2 h-2 rounded-full ${issue.status.toLowerCase() === "open" ? "bg-green-600" : "bg-purple-600"}"></span>
                            <div class="badge badge-soft">${issue.priority}</div> 
                        </div>

                        <div class="flex-grow">
                            <h2 class="font-semibold mt-2">${issue.title}</h2>
                            <p class="line-clamp-2 text-gray-500 text-sm">${issue.description}</p>
                        </div>

                        <div class="labels-container flex flex-wrap gap-1 mt-3 mb-2 text-xs">
                            <!-- labels will go here -->
                        </div>

                        <div class="mt-auto">
                            <hr class="text-base-300 mb-2 w-full">
                            <div class="bg-white text-xs text-gray-500">
                                <p>${issue.author}</p>
                                <p>${new Date(issue.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
        
        `;

        // priority-color
        const priorityBadge = div.querySelector(".badge");
        if(priority === "high"){
           priorityBadge.classList.add("badge-error");
        }
        else if(priority === "medium"){
            priorityBadge.classList.add("badge-warning");
        }
        else {
            priorityBadge.classList.add("badge-accent");
        }

        // add labels:
        const labelsContainer = div.querySelector('.labels-container');
        issue.labels.forEach(label=>{
            const span = document.createElement('span');
            const lbl = label.toLowerCase()
            span.className = "badge badge-outline text-[10px] h-auto py-1";

            if(lbl === "bug"){
                span.classList.add("badge-error");
            }
            else if(lbl === "help wanted"){
                span.classList.add("badge-warning");
            }
            else if(lbl === "enhancement"){
                span.classList.add("badge-success");
            }
            else if(lbl === "documentation"){
                span.classList.add("badge-info");
            }
            else{
                span.classList.add("badge-secondary");
            }
            
            span.textContent = label.toLowerCase();
            labelsContainer.appendChild(span);
        });


        grid.appendChild(div);

    });
    cardContainer.appendChild(grid);
};
loadIssues();

