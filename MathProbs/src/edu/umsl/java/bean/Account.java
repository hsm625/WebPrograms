package edu.umsl.java.bean;

import org.apache.tomcat.jni.Time;

public class Account {
	String username;
	String password;
	Time ctime;
	boolean exists = false;
	
	public void setUName(String s){
		this.username = s;
	}
	
	public String getUName(){
		return this.username;
	}
	
	public void setPWord(String s){
		this.password = s;
	}
	
	public String getPWord(){
		return this.password;
	}
}
