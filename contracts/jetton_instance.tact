import "./jetton";
import "./jetton_wallet";

message Mint {
    amount: Int;
    receiver: Address;
}

contract JettonInstance with Jetton {

    totalSupply: Int as coins;
    mintable: Bool;
    owner: Address;
    jettonContent: Cell;

    maxSupply: Int as coins; 

    init(owner: Address, jettonContent: Cell, maxSupply: Int) {
        self.totalSupply = 0;
        self.mintable = true;
        self.owner = owner;
        self.jettonContent = jettonContent;
        self.maxSupply = maxSupply;
    }

    receive(msg: Mint) {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Failed Verification");
        require(self.mintable, "Cannot Mint");
        require(self.totalSupply + msg.amount <= self.maxSupply, "Max Supply Exceeded");
        self.mint(msg.receiver, msg.amount, self.owner);
    }

    // receive("Mint: 100") {
    //     let ctx: Context = context();
    //     require(self.mintable, "Not mintable");
    //     require(self.totalSupply + 100 <= self.maxSupply, "Max supply exceeded");
    //     self.mint(ctx.sender, 100, self.owner);        
    // }

    // renounce?

    receive("CloseMinting") {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not owner");
        self.mintable = false;
    }
}
