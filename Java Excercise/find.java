class find{
    public static boolean main(int []arr, int ele){
        boolean con = false;
        for(int i=0;i<arr.length;i++){
            if(ele == arr[i]){
                con = true;
                break;
            }
        }
        return con;
    }

    public static void main(String[] args){
        int []arr = {1,2,3,4,5,6,7,8,9,11,3,34,5,5,7,8,22,87,34,56,78,90};
        int ele = 22;
        boolean con = main(arr,ele);
        if(con == true){
            System.out.println("Element is Found :) ");
        }else{
            System.out.println("Element is not Found :( ");
        }
    }
}