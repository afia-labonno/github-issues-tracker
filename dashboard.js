
let openIssueList = [];
let closedIssueList = [];
let currentTab = "all-tab-btn";


const loadingSpinner = document.getElementById("loadingSpinner");

// tab-btn
const allIssuesTab = document.getElementById("all-tab-btn");
const openIssuesTab = document.getElementById("open-tab-btn");
const closedIssuesTab = document.getElementById("closed-tab-btn");
// card-container
const cardContainer = document.getElementById("cardContainer");
// issues-count
let issuesCount = document.getElementById("total-issue");


const showLoading = ()=>{
   
        loadingSpinner.classList.remove("hidden");
        cardContainer.innerHTML = "";
}

const hideLoading = ()=>{
   
        loadingSpinner.classList.add("hidden");
       
}
    

const loadIssues = async () => {
    showLoading();
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const response = await fetch(url);
    const data = await response.json();
    const issues = data.data ;

    //filter the issues
    openIssueList = issues.filter(issue => issue.status === "open");
    closedIssueList = issues.filter(issue => issue.status === "closed");

    hideLoading();
    renderIssues(currentTab);
    
}

const renderIssues = (tabId) => {
    
    cardContainer.innerHTML = "";

    let displayIssues = [];
    if(tabId === "all-tab-btn"){
        displayIssues = [...openIssueList, ...closedIssueList] ;
    } 
    else if(tabId === "open-tab-btn"){
        displayIssues = openIssueList ;
    }
    else if(tabId === "closed-tab-btn"){
        displayIssues = closedIssueList ;
    }


    // active buttton
    let tabBtn = [allIssuesTab, openIssuesTab, closedIssuesTab];

    tabBtn.forEach(btn =>{
        btn.classList.remove("btn-primary", "text-white");
        btn.classList.add("text-gray-500");
    });
    document.getElementById(tabId).classList.add("btn-primary", "text-white");
    currentTab = tabId ;

    //count the issues
    issuesCount.innerText = `${displayIssues.length} Issues` ;

    // grid container
    const grid = document.createElement("div");
    grid.classList.add("grid", "grid-cols-4", "gap-4");

    //cards
    displayIssues.forEach(issue => {

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
                            <span class="status w-2 h-2 rounded-full ${issue.status === "open" ? "bg-green-600" : "bg-purple-600"}"></span>
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

// const totalIssuesCount = (issues) =>{
//     issuesCount.innerText = `${issues.length} Issues` ;
// }

// const toggle = (id) =>{
    
//     allIssuesTab.classList.remove("btn-primary", "text-white");
//     openIssuesTab.classList.remove("btn-primary", "text-white");
//     closedIssuesTab.classList.remove("btn-primary", "text-white");

//     allIssuesTab.classList.add("text-gray-500");
//     openIssuesTab.classList.add("text-gray-500");
//     closedIssuesTab.classList.add("text-gray-500");

//     const selected = document.getElementById(id);
//     currentTab = id ; 

//     selected.classList.remove("text-gray-500");
//     selected.classList.add("btn-primary", "text-white");

//     if(id === "all-tab-btn"){
//         cardContainer.classList.remove("hidden");
//         filteredSection.classList.add("hidden");
//         const allIssues = [...openIssueList, ...closedIssueList];
//         displayIssues([...openIssueList,...closedIssueList],cardContainer)
//         totalIssuesCount(allIssues);
//     }
//     else if(id === "open-tab-btn"){
//         cardContainer.classList.add("hidden");
//         filteredSection.classList.remove("hidden");
//         displayIssues(openIssueList,filteredSection);
//         totalIssuesCount(openIssueList);
//     }
//     else if(id === "closed-tab-btn"){
//         cardContainer.classList.add("hidden");
//         filteredSection.classList.remove("hidden");
//         displayIssues(closedIssueList,filteredSection);
//         totalIssuesCount(closedIssueList);
        
//     }
// }

allIssuesTab.addEventListener("click", () => renderIssues("all-tab-btn"));
openIssuesTab.addEventListener("click", () => renderIssues("open-tab-btn"));
closedIssuesTab.addEventListener("click", () => renderIssues("closed-tab-btn"));


loadIssues();

