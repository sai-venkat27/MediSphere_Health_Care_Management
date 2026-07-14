import java.util.Scanner;
class Nodes{
    int data;
    Nodes next;
    Nodes(int data){
        this.data = data;
        this.next = null;
    }
}

public class linked{
    Nodes head;
    public void add(int data){
        
        Nodes newNode = new Nodes(data);
        if(head== null){
            head = newNode;
        }else{
            Nodes cur = head;
            while(cur.next != null){
                cur = cur.next;
            }
            cur.next = newNode;
        }
    }
    public void printing(){
        Nodes temp = head;
        while(temp != null){
            System.out.print(temp.data +" ->");
            temp = temp.next;
        }
        System.out.print(" null");
    }
    public boolean delete (int data){
        if(head == null){
            return false;
        }
        if(head.data == data){
            head = head.next;
            return true;
        }
        Nodes cur = head;
        while(cur.next != null){
            if(cur.next.data == data){
                cur.next = cur.next.next;
                return true;

            }
            cur = cur.next;
            
        }
        return false;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size : ");
        
        linked l = new linked();

        int n= sc.nextInt();
        
        for(int i = 1;i<=n;i++){
            l.add(sc.nextInt());
        }
        
        l.printing();

        System.out.print("\nEnter the element to be deleted : ");
        int del = sc.nextInt();
        boolean check = l.delete(del);
        
        l.printing();
        if(check){
            System.out.println("\nElement deleted successfully");
        }else{
            System.out.println("\nElement not deleted");
        }

        sc.close();
    }
    
}
