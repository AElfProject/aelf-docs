### Transfer NFT Token
As we have completed `Create` and `Fetch NFT` so now it's time to `Transfer NFT`.
So now let's **Transfer NFT** to other wallet now.
**Step 1: Locate the File**
1. go to the `src/pages/transfer-nft/index.tsx` file. This file is the **Transfer NFT** page where users can enter details like the `address`, `amount` and `memo`.
**Step 2: Prepare Form for Transfer NFT**
1.  Find the comment `// Configure NFT Transfer Form`.

2.  Replace the form variable with this code snippet:

```javascript title="transfer-nft/index.tsx"
// Configure NFT Transfer Form
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    address: "",
    amount: "0",
    memo: "",
  },
});
```

#### Here's what the function does:
1. Initializes a new form variable with default values needed to transfer a nft.
2. Fields include: `address` , `amount` , and `memo`.
Now your form is ready for users to fill in the necessary details for their NFTs Transfer function Interaction.
**Step 3: Create NFT Transfer Function**
1.  Find the comment `// Transfer NFT to Other Wallet`.
2.  Replace the form variable with this code snippet:
```javascript title="transfer-nft/index.tsx"
// Transfer NFT to Other Wallet
const transferNftToOtherAccount = async (values: {
  address: string;
  amount: string;
  memo: string;
}) => {
  if (Number(values.amount) > Number(nftBalance)) {
    toast.error("Amount must be Less than or Equal to Supply Balance");
    return;
  }
  const transferNFTLoadingId = toast.loading("Transfer Transaction Executing");
  try {
    const transferNtfInput = {
      to: values.address,
      symbol: nftSymbol,
      amount: +values.amount,
      memo: values.memo,
    };
    await sideChainSmartContract?.callSendMethod(
      "Transfer",
      currentWalletAddress,
      transferNtfInput
    );
    toast.update(transferNFTLoadingId, {
      render: "NFT Transferred Successfully!",
      type: "success",
      isLoading: false,
    });
    removeNotification(transferNFTLoadingId);
    await delay(3000);
    handleReturnClick();
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  };
};
```
#### Here's what the function does:

1. **Transfers NFT to Another Wallet:** The function `transferNftToOtherAccount` transfers a specified amount of an NFT to another wallet.
2. **Parameters:** It takes a `values` object containing:
   - `address`: The destination wallet address.
   - `amount`: The amount of NFT to transfer.
   - `memo`: An optional memo for the transfer.
3. **Checks Balance:** It checks if the transfer amount is greater than the available `nftBalance`. If it is, it shows an error message and exits the function.
4. **Displays Loading Toast:** It displays a loading toast notification indicating that the transfer transaction is executing.
5. **Prepares Transfer Data:** It prepares the transfer data in the `transferNtfInput` object, which includes the destination address, NFT symbol, transfer amount, and memo.
6. **Executes Transfer:** It calls the `Transfer` method on the side chain smart contract to execute the transfer.
7. **Success Handling:** If the transfer is successful:
   - It updates the toast notification to indicate success.
   - It removes the loading notification.
   - It waits for 3 seconds using `await delay(3000)`.
   - It calls `handleReturnClick` to handle any post-transfer actions.
8. **Error Handling:** If an error occurs during the transfer:
   - It logs the error message to the console.
   - It displays an error toast notification with the error message.

**Step 4: Configure on handle Submit Form**

1.  Find the comment `// Handle Transfer Submit Form`.

2.  Replace the form variable with this code snippet:

```javascript title=""
// Handle Transfer Submit Form
function onSubmit(values: z.infer<typeof formSchema>) {
  transferNftToOtherAccount(values);
}
```
#### Here's what the function does:
1. **Handles Form Submission:** The function `onSubmit` handles the submission of a transfer form.
2. **Parameters:** It takes `values`, which is inferred from the `formSchema` and represents the form's data.
3. **Calls Transfer Function:** It calls the `transferNftToOtherAccount` function with the form values to initiate the NFT transfer.
Now that we've written all the necessary frontend functions and components, we're ready to run the NFT dApp application in the next step.
