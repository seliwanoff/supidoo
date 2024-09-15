<?php
session_start();
include('../connect.php');
if(isset($_GET['password'])){
    $password = md5($_GET['password']);
    $update = "UPDATE `register` SET `password`='".$password."' WHERE `username`='".$_COOKIE['username']."' `username` = '".$_SESSION['username']."'";
    $query = mysqli_query($link,$update);
    if($query){
        echo 1;
    }else{
        echo 0;
    }

}
if(isset($_GET['email'])){
    $email = $_GET['email'];
    $update = "UPDATE `register` SET `email`='".$email."' WHERE `username`='".$_COOKIE['username']."'OR `username` = '".$_SESSION['username']."'";
    $query = mysqli_query($link,$update);
    if($query){
        echo 1;
    }else{
        echo 0;
    }

}
if(isset($_GET['buy'])){
    $services = $_GET['service'];
    $id = $_GET['id'];
    $selectq = "SELECT * FROM `$services` WHERE `id`='".$id."'";
    $queryd = mysqli_query($link,$selectq);
    $fetchh = mysqli_fetch_assoc($queryd);
    $price = $fetchh['price'];
    $balanceselects  = "SELECT * FROM `register` WHERE `username` = '".$_SESSION['username']."'";
    $connectquery = mysqli_query($link,$balanceselects);
    $fetchusery = mysqli_fetch_assoc($connectquery);

    $balanceselect  = "SELECT * FROM `wallet` WHERE `member_id` = '".$fetchusery['member_id']."'";
    $balquery = mysqli_query($link,$balanceselect);
    $fecthbala = mysqli_fetch_assoc($balquery);
    $balance = $fecthbala['balance'];
    $expences = $fecthbala['expenses'];
    if($balance>=$price){
       $newbalance = $balance - $price;
       $newexpenses = $expences +$price;
       $updatebalance = "UPDATE `wallet` SET `balance`='".$newbalance."',`expenses` ='".$newexpenses."' WHERE `member_id`='".$fetchusery['member_id']."'";
       $queryupdate = mysqli_query($link,$updatebalance);

       $balancename  = "SELECT * FROM `register` WHERE `username` = '".$_SESSION['username']."'";
       $balname = mysqli_query($link,$balancename);
       $fecthname = mysqli_fetch_assoc($balname);
       $email = $fecthname['email'];
       $date = time();
       $status = 'purchased';
       $insert = "INSERT INTO `order`(`username`, `email`, `item-id`, `services`, `item-price`, `date`, `status`)
        VALUES ('".$_SESSION['username']."','".$email."','".$id."','".$services."','".$price."','".$date."','".$status."')";
        $queryinsert = mysqli_query($link,$insert);
        $updatestatus = "UPDATE `$services` SET `status`='purchased' WHERE `id`='".$id."'";

        $querydel = mysqli_query($link,$updatestatus);
        if($querydel){
            echo 1;
        }else{
            echo 2;
        }

    }else{
        echo 0;
    }
}

?>