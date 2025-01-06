### Configure Create NFT Form Code
**Step 1: Locate the File**
1. Go to the `src/pages/create-nft/index.tsx` file. This file is the **Create NFTs** page where users can enter details like the `tokenName`, `symbol`, `totalSupply` and `decimals`.
**Step 2: Prepare Form to Create NFTs**
1.  Find the comment `// Step D - Configure NFT Form`.

2.  Replace the form variable with this code snippet:

```tsx title="create-nft/index.tsx"
// Step D - Configure NFT Form
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    tokenName: "",
    symbol: "",
    totalSupply: "",
    decimals: "",
  },
});
```

#### Here's what the function does:
1. Initializes a new form variable with default values needed to create an NFT.
2. Fields include: `tokenName` , `symbol` , `totalSupply` , and `decimals`.
Now the form is ready for users to fill in the necessary details for their NFT function interaction.
