
### Start Your Smart Contract Project

- Open your `Terminal`.

- Enter the following command to generate a new project:

```bash title="Terminal"
mkdir tic-tac-toe-dapp
cd tic-tac-toe-dapp
dotnet new aelf -n TicTacToe
```

### Adding Your Smart Contract Code

Now that we have a template tic-tac-toe project, we can customise the template to incorporate our own contract logic. Let's start by implementing methods to handle the basic functionality for starting the Tic-Tac-Toe game, allowing players to make moves, retrieving the game board data and current status, and checking if the game has been initialized. Tic-Tac-Toe dApp includes the below functionalities:
1. Start a new game
2. Make a move in the ongoing game
3. Get the board details
4. Get the current status of the board
5. Get the initial status of the board

- Enter this command in your `Terminal`.

```bash title="Terminal"
cd src
```

#### Defining Methods and Messages

- Rename the proto file name `hello_world_contract.proto` inside folder `Protobuf/contract/` to `tic_tac_toe.proto`:

```bash title="Terminal"
mv Protobuf/contract/hello_world_contract.proto Protobuf/contract/tic_tac_toe.proto
```

The `.proto` file defines the structure and serialization of data, ensuring consistent communication and data exchange between the contract and external systems.

- Open the project with your IDE.

The implementation of `tic_tac_toe.proto` file inside folder `src/Protobuf/contract/` is as follows:

```csharp title="tic_tac_toe.proto"
syntax = "proto3";

import "aelf/options.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "Protobuf/reference/acs12.proto";
// The namespace of this class
option csharp_namespace = "AElf.Contracts.TicTacToe";

service TicTacToe {
  // The name of the state class the smart contract is going to use to access blockchain state
  option (aelf.csharp_state) = "AElf.Contracts.TicTacToe.TicTacToeState";
  option (aelf.base) = "Protobuf/reference/acs12.proto";

  rpc Initialize (google.protobuf.Empty) returns (google.protobuf.Empty) {}
  
  rpc StartGame (google.protobuf.Empty) returns (google.protobuf.StringValue) {}
  
  rpc MakeMove (MoveInput) returns (google.protobuf.StringValue) {}
  
  rpc GetBoard (google.protobuf.Empty) returns (Board) {
    option (aelf.is_view) = true;
  }
  
  rpc GetGameStatus (google.protobuf.Empty) returns (GameStatus) {
    option (aelf.is_view) = true;
  }
  rpc GetInitialStatus(google.protobuf.Empty) returns(google.protobuf.BoolValue){
    option (aelf.is_view) = true;
  }
}

// Input for making a move
message MoveInput {
  int32 x = 1;
  int32 y = 2;
}

// A message to represent the game board
message Board {
  repeated string rows = 1;
}

// A message to represent the game status
message GameStatus {
  string status = 1;
  string winner = 2;
}
```

- `rpc` methods define the callable functions within the contract, allowing external systems to interact with the contract's logic.
- `message` represent the structured data exchanged between the contract and external systems.

#### Define Contract States

The implementation of the Tic-Tac-Toe dApp state inside file `src/TicTacToeState.cs` is as follows:

```csharp title="src/TicTacToeState.cs"
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.TicTacToe
{
    // The state class is access the blockchain state
    public partial class TicTacToeState : ContractState 
    {
        // A state to check if contract is initialized
        public BoolState Initialized { get; set; }
        public SingletonState<Address> Owner { get; set; }
        public StringState Board { get; set; } // Board state as a concatenated string
        public StringState CurrentPlayer { get; set; } // X or O
        public StringState GameStatus { get; set; } // ongoing, finished, draw
        public StringState Winner { get; set; } // X or O
    }
}
```

- The `State.cs` file in an aelf blockchain smart contract holds the variables that store the contract's data, making sure this data is saved and accessible whenever the contract needs it.

#### Implement Tic-Tac-Toe Smart Contract 

The implementation of the Tic-Tac-Toe dApp smart contract inside file `src/TicTacToe.cs` is as follows:

```csharp title="src/TicTacToe.cs"
using Google.Protobuf.WellKnownTypes;
using System.Collections.Generic;

namespace AElf.Contracts.TicTacToe
{
    // Contract class must inherit the base class generated from the proto file
    public class TicTacToe : TicTacToeContainer.TicTacToeBase
    {
     private const int BoardSize = 3;

        public override Empty Initialize(Empty input)
        {
            if (State.Initialized.Value)
            {
                return new Empty();
            }
            State.Initialized.Value = true;
            State.Owner.Value = Context.Sender;
            ResetBoard();
            return new Empty();
        }

        public override StringValue StartGame(Empty input)
        {
            if (!State.Initialized.Value)
            {
                return new StringValue { Value = "Contract not initialized." };
            }

            ResetBoard();
            State.CurrentPlayer.Value = "X";
            State.GameStatus.Value = "ongoing";
            State.Winner.Value = "";
            return new StringValue { Value = "Game started. Player X's turn." };
        }

        public override StringValue MakeMove(MoveInput input)
        {
            if (State.GameStatus.Value != "ongoing")
            {
                return new StringValue { Value = "Game is not ongoing." };
            }

            var board = GetBoardArray();
            if (board[input.X, input.Y] != "")
            {
                return new StringValue { Value = "Invalid move. Cell is already occupied." };
            }

            board[input.X, input.Y] = State.CurrentPlayer.Value;
            SaveBoard(board);

            if (CheckWinner())
            {
                State.GameStatus.Value = "finished";
                State.Winner.Value = State.CurrentPlayer.Value;
                return new StringValue { Value = $"Player {State.CurrentPlayer.Value} wins!" };
            }

            if (IsBoardFull(board))
            {
                State.GameStatus.Value = "draw";
                return new StringValue { Value = "It's a draw!" };
            }

            State.CurrentPlayer.Value = State.CurrentPlayer.Value == "X" ? "O" : "X";
            return new StringValue { Value = $"Player {State.CurrentPlayer.Value}'s turn." };
        }

        public override Board GetBoard(Empty input)
        {
              var board = GetBoardArray();
              var boardMessage = new Board();
          
              for (var i = 0; i < 3; i++) // Adjusted to 3 for a 3x3 Tic-Tac-Toe board
              {
                  var row = new List<string>();
                  for (var j = 0; j < 3; j++)
                  {
                      row.Add(board[i, j]);
                  }
                  boardMessage.Rows.Add(string.Join(",", row));
              }
          
              return boardMessage;
        }

        public override GameStatus GetGameStatus(Empty input)
        {
            return new GameStatus
            {
                Status = State.GameStatus.Value,
                Winner = State.Winner.Value
            };
        }

        public override BoolValue GetInitialStatus(Empty input){
              return new BoolValue { Value = State.Initialized.Value };
          }

        private void ResetBoard()
        {
            var emptyBoard = new string[BoardSize, BoardSize];
            for (var i = 0; i < BoardSize; i++)
            {
                for (var j = 0; j < BoardSize; j++)
                {
                    emptyBoard[i, j] = "";
                }
            }
            SaveBoard(emptyBoard);
        }

        private string[,] GetBoardArray()
        {
            var boardString = State.Board.Value;
            var rows = boardString.Split(';');
            var board = new string[BoardSize, BoardSize];
            for (var i = 0; i < BoardSize; i++)
            {
                var cells = rows[i].Split(',');
                for (var j = 0; j < BoardSize; j++)
                {
                    board[i, j] = cells[j];
                }
            }
            return board;
        }

        private void SaveBoard(string[,] board)
        {
            var rows = new string[BoardSize];
            for (var i = 0; i < BoardSize; i++)
            {
                rows[i] = string.Join(",", board[i, 0], board[i, 1], board[i, 2]);
            }
            State.Board.Value = string.Join(";", rows);
        }

        private bool CheckWinner()
        {
            var board = GetBoardArray();
            var player = State.CurrentPlayer.Value;

            for (var i = 0; i < BoardSize; i++)
            {
                if (board[i, 0] == player && board[i, 1] == player && board[i, 2] == player) return true;
                if (board[0, i] == player && board[1, i] == player && board[2, i] == player) return true;
            }

            if (board[0, 0] == player && board[1, 1] == player && board[2, 2] == player) return true;
            if (board[0, 2] == player && board[1, 1] == player && board[2, 0] == player) return true;

            return false;
        }

        private bool IsBoardFull(string[,] board)
        {
            for (var i = 0; i < BoardSize; i++)
            {
                for (var j = 0; j < BoardSize; j++)
                {
                    if (board[i, j] == "") return false;
                }
            }
            return true;
        }
    }
    
}
```

### Building Smart Contract

- Build the smart contract code with the following command inside `src` folder:

```bash title="Terminal"
dotnet build
```

You should see **TicTacToe.dll.patched** in the directory `1-smart-contract/src/bin/Debug/net.6.0`
