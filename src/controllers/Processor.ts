import { MonitorProps } from "../components/presentative/Monitor";
import {BlockProps} from "./../components/presentative/Block";
import {PageProps} from "./../components/presentative/Page";

const InitialBlocks = (): Array<BlockProps> => {
    return [
        {
            text: "null",
            color: "#d1aaff",
        },
        {
            text: "null",
            color: "#d1aaff",
        },
        {
            text: "null",
            color: "#d1aaff",
        },
        {
            text: "null",
            color: "#d1aaff",
        },
        {
            text: "null",
            color: "#d1aaff",
        },
        {
            text: "null",
            color: "#d1aaff",
        },
        {
            text: "null",
            color: "#d1aaff",
        },
        {
            text: "null",
            color: "#d1aaff",
        },
        {
            text: "null",
            color: "#d1aaff",
        },
        {
            text: "null",
            color: "#d1aaff",
        }
    ]

};

const InitialPages = (): Array<PageProps> => {
    return [
        {
            physical: 0,
            logical: -1,
            blockProps: InitialBlocks()
        },
        {
            physical: 1,
            logical: -1,
            blockProps: InitialBlocks()
        },
        {
            physical: 2,
            logical: -1,
            blockProps: InitialBlocks()
        },
        {
            physical: 3,
            logical: -1,
            blockProps: InitialBlocks()
        }
    ];
};


const InitialInstructions = (): Array<number> => {

    return [
        -1,
        -1,
        -1,
        -1
    ]
};


const sleep = (time: number): Promise<void> => {
    return new Promise((resolve) => { setTimeout(resolve, time); });
};


class Processor{

    isStop: boolean = true;

    selectedAlgorithm: string = 'LRU';

    instructions: Array<number> = InitialInstructions();

    instructionSet: Set<number> = new Set();

    pages: Array<PageProps> = InitialPages();

    speed: number = 500;

    pageCount: number = 0;

    instructionCount: number = 0;

    monitor: MonitorProps = {
        rateOfMiss: 0,
        instruction: -1,
        isContain: false,
        removed: -1,
        show: false
    };

    update: ((processor: Processor) => void);
    
    run: (() => void) = (() => {
        
        this.isStop = false;

        if(this.selectedAlgorithm === 'FIFO'){
            this.FIFOrun();
        }
        else if (this.selectedAlgorithm === 'LRU') {
            this.LRUrun();
        }
    });


    constructor(update: (processor:Processor) => void)
    {
        this.update = update;
    }

    logicalPageChange(page: PageProps, logicalPage: number) {
        page.logical = logicalPage;
        page.blockProps.forEach((block: BlockProps, index: number) => {
            block.text = (page.logical * 10 + index).toString();
        });

        this.update(this);
    }

    logicalPageClear(page: PageProps)
    {
        page.blockProps.forEach((block: BlockProps, index: number) => {
            block.text = "null";
        });

        this.update(this);
    }

    memoryDispatchPage(physicalPage: number, logicalPage: number)
    {
        this.logicalPageChange(this.pages[physicalPage], logicalPage);

        this.update(this);
    }

    memoryCheckPage(address: number)
    {
        for (let i = 0; i < 4; i++)
        {
            if(this.pages[i].logical === Math.floor(address/10))
            {
                return i;
            }
        }
        return -1;
    }

    monitorClear()
    {
        this.monitor={
            rateOfMiss: 0,
            instruction: -1,
            isContain: false,
            removed: -1,
            show: false
        };

        this.update(this);
    }

    memoryClear()
    {
        this.pages.forEach((page: PageProps, index: number) => {
            this.logicalPageClear(page);
        });

        this.update(this);
    }

    waitingListClear()
    {
        this.instructions.forEach((instruction: number, index: number) => {
            this.instructions[index] = -1;
        });

        this.update(this);
    }

    waitingListTurn(newInstruction: number)
    {
        this.instructions.forEach((instruction: number, index: number) => {
            if (index < 3) {
                this.instructions[index] = this.instructions[index + 1];
            }
        });
        this.instructions[3] = newInstruction;

        this.update(this);
    }

    async clear()
    {
        this.isStop = true;

        await sleep(this.speed);

        this.waitingListClear();
        this.memoryClear();
        this.monitorClear();
        this.instructionSet.clear();
        this.update(this);

        this.isStop = true;
        
        await sleep(this.speed);

        this.selectedAlgorithm= 'LRU';

        this.instructions= InitialInstructions();

        this.instructionSet= new Set();

        this.pages= InitialPages();

        this.speed= 500;

        this.pageCount= 0;

        this.instructionCount= 0;

        this.monitor= {
            rateOfMiss: 0,
            instruction: -1,
            isContain: false,
            removed: -1,
            show: false
        };
        
        this.update(this);
    


    }


    async generateInformation(rateOfMiss:number,pageNum: number, instruction: number,isContain:boolean, removed: number)
    {
        this.monitor.show = true;
        this.monitor.rateOfMiss = rateOfMiss;
        if (isContain)
        {
            this.monitor.isContain = true;
            this.monitor.instruction = instruction;
            this.monitor.removed = -1;

            this.pages[pageNum].blockProps[instruction % 10].color = "#797ef6";

            this.update(this);
			
            await sleep(this.speed);

            this.pages[pageNum].blockProps[instruction % 10].color = "#d1aaff";

            this.update(this);
        }
        else
        {
            this.monitor.isContain = false;
            this.monitor.instruction = Math.floor(instruction / 10);
            this.monitor.removed = this.pages[removed].logical;

            this.update(this);
        }

    }


    generateInstruction(last: number): number
    {

        if (last === -1)
        {
            return Math.floor(Math.random() * 320);
        }

        let next = -1;
        
        if (this.instructionCount % 2 === 0) {

            if ((this.instructionCount / 2) % 2 === 0)
            {
                next = Math.floor(Math.random() * last);

                let times = 0;
                while (this.instructionSet.has(next))
                {
                    times++;
                    next = Math.floor(Math.random() * last);

                    if (times > last - 1)
                    {
                        while (this.instructionSet.has(next))
                        {
                            next = Math.floor(Math.random() * 320);
                        }
                    }
                }
                this.instructionSet.add(next);
            }
            else
            {
                next = Math.floor(last + Math.random() * (320 - last));
                let times = 0;
                while (this.instructionSet.has(next))
                {
                    times++;
                    next = Math.floor(last + Math.random() * (320 - last));
                    if (times > (319 - last)) {
                        while (this.instructionSet.has(next))
                        {
                            next = Math.floor (Math.random() * 320);
                        }
                    }
                }
                this.instructionSet.add(next);
            }
        }
        else
        {
            next = last + 1;
            if (next > 319) {
                next = next % 320;
            }
            while (this.instructionSet.has(next)) {
                next++;
                if (next > 319) {
                    next = next % 320;
                }
            }
            this.instructionSet.add(next);
        }
        this.instructionCount++;
        return next;
    }

    async LRUrun() {

        if (this.isStop)
        {
            return;
        }


        let cnt_miss = 0;
        let currentInstruction = -1;
        let free = Array(4).fill(0);
        
        for (let i = 0; i < 4; i++)
        {
            currentInstruction=this.generateInstruction(currentInstruction);
            this.waitingListTurn(currentInstruction);
        }

        for (let i = 0; i < 320; i++)
        {
            if (this.isStop)
            {
                return;
            }

            currentInstruction = this.instructions[0];

            if (this.memoryCheckPage(currentInstruction) !== -1)
            {
                for (let j = 0; j < 4; j++)
                {
                    free[j]++;
                }
                free[this.memoryCheckPage(currentInstruction)] = 0;

                await this.generateInformation((cnt_miss/this.instructionCount)*100,this.memoryCheckPage(currentInstruction), currentInstruction, true, -1);
            }
            else
            {
                let turn = 0;
                let longest = 0;

                for(let j = 0; j < 4; j++)
                {
                    if(free[j] > longest)
                    {
                        longest = free[j];
                        turn = j;
                    }
                }

                for(let j = 0; j < 4; j++)
                {
                    free[j]++;
                }

                free[turn] = 0;

                await this.generateInformation((cnt_miss/this.instructionCount)*100,this.memoryCheckPage(currentInstruction), currentInstruction, false, turn);

                this.memoryDispatchPage(turn, Math.floor(currentInstruction / 10));

                this.pages[turn].blockProps[currentInstruction % 10].color = "#797ef6";

                this.update(this);
                
                await sleep(this.speed);

                this.pages[turn].blockProps[currentInstruction % 10].color = "#d1aaff";

                this.update(this);

                cnt_miss++;
            }

            if (i < 316)
            {
                currentInstruction = this.generateInstruction(this.instructions[3]);
                this.waitingListTurn(currentInstruction);
            }
            else
            {
                this.waitingListTurn(-1);
            }

            await sleep(this.speed);

        }

    }

    async FIFOrun() {

        if (this.isStop)
        {
            return;
        }


        let cnt_miss = 0;
        let currentInstruction = -1;
        let turn = 0;
        
        for (let i = 0; i < 4; i++)
        {
            currentInstruction=this.generateInstruction(currentInstruction);
            this.waitingListTurn(currentInstruction);
        }

        for (let i = 0; i < 320; i++) {

            if (this.isStop)
            {
                return;
            }

            currentInstruction = this.instructions[0];

            if (this.memoryCheckPage(currentInstruction) !== -1) {

                await this.generateInformation((cnt_miss / this.instructionCount) * 100, this.memoryCheckPage(currentInstruction), currentInstruction, true, -1);
            }
            else
            {

                await this.generateInformation((cnt_miss / this.instructionCount) * 100, this.memoryCheckPage(currentInstruction), currentInstruction, false, turn);

                this.memoryDispatchPage(turn, Math.floor(currentInstruction / 10));

                this.pages[turn].blockProps[currentInstruction % 10].color = "#797ef6";

                this.update(this);
                
                await sleep(this.speed);

                this.pages[turn].blockProps[currentInstruction % 10].color = "#d1aaff";

                this.update(this);
                
                turn++;
                cnt_miss++;
                if (turn > 3)
                {
                    turn = turn % 4;
                }
            }

            if (i < 316) {
                currentInstruction = this.generateInstruction(this.instructions[3]);
                this.waitingListTurn(currentInstruction);
            }
            else {
                this.waitingListTurn(-1);
            }

            await sleep(this.speed);
        }

    }

}

export default Processor;