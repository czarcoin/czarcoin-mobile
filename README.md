# Czarcoin mobile client
Mobile client for secure file storing.
All files will be encrypted before sending to distributed network.

# Overview

- [Getting started](#anchorGettingStarted)
- [Storj API Description](#anchorStorjApiDescription)
	 - [Authorization](#anchorAuthorization)
		  - [Generate mnemonic](#anchorAuthGenerateMnemonic) 
		  - [Check mnemonic](#anchorAuthCheckMnemonic) 
		  - [Verify keys](#anchorAuthVerifyKeys)
		  - [Check keys exists](#anchorAuthCheckKeysExists) 
		  - [Import keys](#anchorAuthImportKeys) 
		  - [Delete keys](#anchorAuthDeleteKeys) 
		  - [Get keys](#anchorAuthGetKeys)
		  - [Registration](#anchorAuthRegistration)
	 - [Buckets](#anchorBuckets) 
	     - [Buckets list](#anchorBucketList) 
	     - [Bucket creation](#anchorBucketCreate) 
	     - [Bucket deletion](#anchorBucketDelete)
	  - [Files](#anchorFiles)
		  - [File Upload](#anchorFilesUpload)
		  - [File Upload Progress](#anchorFileUploadProgress)
		  - [File Upload Cancelation](#anchorFileUploadCancelation)
		  - [File Download](#anchorFilesDownload)
		  - [File Download Cancelation](#anchorFileDownloadCancelation)
- [Features](#anchorFeatures)	
- [Project Structure](#anchorProjStruct)
  - [Frontend](#anchorFront)
  - [Android](#anchorAndroid)
  - [iOS](#anchorIos)
- [Known Issues](#anchorIssues)
- [Step by step tutorials](#anchorTutorials)
  - [Android](#anchorAndroidTutorial)
  - [Ios](#anchorIosTutorial)
  - [React-native](#anchorRnTutorial)

<a name="anchorGettingStarted"></a>
## Getting Started
Install react native(Building projects with native code) -> https://facebook.github.io/react-native/docs/getting-started.html 

1. ```git clone git@github.com:storj/storj-mobile.git```
2. ```cd storj-mobile``` 
3. ```npm install```
4. Run
  * Android 
     * ```react-native run-android```
  * iOS
     * ```react-native run-ios```
5. Run on physical device
  * Android
     * ```react-native run-android --device```
  * iOS
     * ```react-native run-ios --device```

<a name="anchorStorjApiDescription"></a>
## Storj API description

As current implmentation of Storj API we used [libstorj](https://github.com/storj/libstorj) and its wrappers for [android](https://github.com/storj/android-libstorj) and [IOS](https://github.com/storj/ios-libstorj).
But you are able implement all API calls by yourself, [look](https://storj.io/api.html)

<a name="anchorAuthorization"></a>
#### Authorization

Authorization is based on auth files that is stored on the device and can can be encrypted with password(PIN code). Auth file contains email, password and menmonic

General description of auth file content: 

```
string email
string password
string mnemonic
```

Authorization metnods for Android from [java-libstorj](https://github.com/storj/java-libstorj/)

Authorization methods for iOS from [ios-libstorj](https://github.com/storj/ios-libstorj/)

<a name="anchorAuthGenerateMnemonic"></a>
##### Generate new mnemonic
Generates new mnemonic. 24 words

###### Android

```java
static native String generateMnemonic(int var)
```

###### iOS

```objc
-(NSString *_Nullable)generateMnemonic:(int)strength
```

<a name="anchorAuthCheckMnemonic"></a>
##### Check mnemonic
Checks if mnemonic is correct. The only parameter - is mnemonic string.

###### Android

```java
static native boolean checkMnemonic(String var)
```

###### iOS

```objc
-(BOOL)checkMnemonic:(NSString *_Nonnull)mnemonic
```

<a name="anchorAuthVerifyKeys"></a>
##### Verify keys
Verifies if user with such credentials exists. It won't return true if user hasn't confirmed his email after registration.

###### Android

```java
int verifyKeys(String user, String pass)
```

###### iOS

```objc
-(BOOL)verifyKeysWithUserEmail:(NSString *_Nonnull) email 
andPassword:(NSString *_Nonnull)password
```

<a name="anchorAuthCheckKeysExists"></a>
##### Check keys exists

Checks if ther is auth file on the device. Return true if file exists, false otherwise.

###### Android

```java
boolean keysExist()
```

###### iOS

<a name="anchorAuthImportKeys"></a>
##### Import keys
Stores new auth file on the device that is encrypted with passcode. By default, passcode is an empty string which means that auth file is not encrypted.

###### Android

```java
boolean importKeys(email, password, mnemonic, passcode)
```

###### iOS

```objc
-(BOOL)importKeysWithEmail:(NSString *) email
              password:(NSString *) password
              mnemonic:(NSString *) mnemonic
           andPasscode:(NSString *) passcode
```

<a name="anchorAuthDeleteKeys"></a>
##### Delete keys
Deletes auth file from the device.

###### Android

```java
boolean deleteKeys()
```

###### iOS

```objc
-(BOOL) deleteAuthFile
```

<a name="anchorAuthGetKeys"></a>
##### Get keys
Reads keys from auth file. If it's encrypted should supply valid one. By default empty string is passed for not encrypted auth file. 

###### Android 

```java
Keys getKeys(String passphrase)
```

Return instance of Keys: 

```java
class Keys {
    private String user;
    private String pass;
    private String mnemonic;
}
```

###### iOS

```objc
-(NSDictionary *_Nullable)getKeysWithPassCode:(NSString *_Nonnull) passcode
```

Returns NSDictionary with keys data :

````objc
@{@"email":email,
  @"password":password,
  @"mnemonic":mnemonic}
````

<a name="anchorAuthRegistration"></a>
##### Registration
Register new user with given email and password. Send email with confirmation link if registration is successfull

###### Android

```java
void register(String user, String pass, RegisterCallback callback)
```

Check what is [RegisterCallback](https://github.com/storj/java-libstorj/blob/master/src/main/java/io/storj/libstorj/RegisterCallback.java)

###### iOS

```objc
-(void)registerUser:(NSString * _Nonnull)username
           password:(NSString * _Nonnull)password
       withCallback:(RegistrationCallback* _Nonnull) callback;
```

<a name="anchorBuckets"></a>
#### Buckets

Bucket - is some kind of a folder. All buckets should be in root directory.

* Currently, there is no possibility to create one bucket inside of another.
* You can not have two buckets with the same name.

You are able to create and to delete buckets. 

Bucket model general scheme: 

```java
string id
string name
string created
boolean decrypted
```
<a name="anchorBucketList"></a>
##### Bucket list

###### Android

```java
public void getBuckets(GetBucketsCallback callback)
```

[GetBucketsCallback](https://github.com/storj/java-libstorj/blob/master/src/main/java/io/storj/libstorj/GetBucketsCallback.java)

###### iOS

```objc
-(void)getBucketListWithCompletion:(BucketListCallback* _Nonnull)completion
```

[BucketListCallback]()

<a name="anchorBucketCreate"></a>
##### Bucket creation

###### Android 
```java
void createBucket(String bucketName, CreateBucketCallback callback)
```
This method has two parameters - bucket name and [CreateBucketCallback](https://github.com/storj/java-libstorj/blob/master/src/main/java/io/storj/libstorj/CreateBucketCallback.java) callback.

###### IOS 

```objc
-(void)createBucket:(NSString *_Nonnull)bucketName
       withCallback:(BucketCreateCallback* _Nonnull)callback;
```

[BucketCreateCallback]()

<a name="anchorBucketDelete"></a>
##### Bucket deletion
Deletion of the bucket will also delete all files, that are uploaded to this bucket.

To delete bucket you should call:

###### Android

```java
void deleteBucket(String bucketId, DeleteBucketCallback callback)
```

This method has two parameters - String bucketId and [DeleteBucketCallback](https://github.com/storj/java-libstorj/blob/master/src/main/java/io/storj/libstorj/DeleteBucketCallback.java) callback.

###### iOS

```objc
-(void)deleteBucket:(NSString *_Nonnull)bucketName
     withCompletion:(BucketDeleteCallback* _Nonnull)callback;
```

[BucketDeleteCallback]()

<a name="anchorFiles"></a>
#### Files
All files stored in Storj distibuted systen as encrypted shards of your original file.

Files could be uploaded to Storj Network, downloaded from it and deleted.

Example of file class in [Java-libstorj](https://github.com/storj/java-libstorj)

```java
public class File {
    private String id;
    private String bucketId;
    private String name;
    private String created;
    private boolean decrypted;
    private long size;
    private String mimeType;
    private String erasure;
    private String index;
    private String hmac;
}
```
<a name="anchorFilesUpload"></a>
##### File uploading
Before uploading file will be encrypted, and splitted on little chunks. During this process all file will be placed in virtual memory of your device. In case if your device doesn't have enough free virtual memory - your application will crash.

To upload file you should call

######Android:
 ```java 
 long uploadFile(String bucketId, String localPath, UploadFileCallback callback)
 ```
 
 This method has three parameters - id of the bucket, path, to the file, and [UploadFileCallback](https://github.com/storj/java-libstorj/blob/master/src/main/java/io/storj/libstorj/UploadFileCallback.java)

Return value of this method - is fileHandle, that is needed to cancel upload.

######iOS:

```objc
-(long) uploadFile: (NSString * _Nonnull) localPath
          toBucket: (NSString * _Nonnull) bucketId
    withCompletion: (SJFileUploadCallback *_Nonnull) completion;
```
<a name="anchorFileUploadProgress"></a>

#####File uploading propgress: 

######Android

In your [UploadFileCallback](https://github.com/storj/java-libstorj/blob/master/src/main/java/io/storj/libstorj/UploadFileCallback.java)
you can find 

```java
void onProgress(String filePath, double progress, long uploadedBytes, long totalBytes)
```
callback. It parameters contains all needed information to implement progress of file uploading in your application.

######iOS

In yout [SJFileUploadCallback](https://github.com/storj/ios-libstorj/blob/master/StorjIOS/StorjIOS/StorjCallbacks/FileOperations/SJFileUploadCallback.h) you can find 

```objc
(^SJFileUploadProgressCallbackBlock)(NSString *fileId,
                                                    double progress,
                                                    double uploadedBytes,
                                                    double totalBytes);
```

callback block. It parameters contains all needed information to implement progress of file uploading in your application.
<a name="anchorFileUploadCancelation"></a>
#####File upload cancellation:

Just save you fileHandle and pass it as a parameter to this method.

######Android

```java
boolean cancelUpload(long uploadState)
```

######iOS
```objc
-(BOOL) cancelUpload:(long) fileRef;
```

<a name="anchorFilesDownload"></a>
##### File downloading

Before file downloading you should check that your device has enough free memory in its disk space. In other case - you can face issues in download behaviour.

######Android: 

```java
long downloadFile(String bucketId, String fileId, String localPath, DownloadFileCallback callback)
```

This method has three parameters - id of the file, path, to the file, and [DownloadFileCallback](https://github.com/storj/java-libstorj/blob/master/src/main/java/io/storj/libstorj/DownloadFileCallback.java)

Return value of this method - is fileHandle, that is needed to cancel download.

######iOS:
```objc
-(long) downloadFile: (NSString * _Nonnull) fileId
          fromBucket: (NSString * _Nonnull) bucketId
           localPath: (NSString * _Nonnull) localPath
      withCompletion: (SJFileDownloadCallback* _Nonnull) completion;
```

This method has three parameters - file id, Bucket id, path to the file and [SJDownloadFileCallback](https://github.com/storj/ios-libstorj/blob/master/StorjIOS/StorjIOS/StorjCallbacks/FileOperations/SJFileDownloadCallback.h)

Return value of this method - is fileHandle, that is needed to cancel download.

<a name="anchorFileDownloadCancelation"></a>
#####File download cancellation:

Just save you fileHandle and pass it as a parameter to this method.

######Android

```java
boolean cancelDownload(long downloadState)
```

######iOS

```objc
-(BOOL) cancelDownload: (long) fileRef;
```

<a name="anchorFeatures"></a>
## Features

Storj Mobile iOS and Android App is multifunctional cloud storage consumer mobile application that allows to individual use all popular cloud storage features but in very secure way and to store files around distributed network of computers around the world.

We designed Storj Mobile applications with the next list of features inside:

- registration
- authorization
- file download
- file upload
- download cancellation
- file preview
- file deletion
- file marking (favorite list)
- bucket creation
- bucket deletion 
- bucket marking (favorite list)
- QR generation with login credentials inside
- QR code scanner
- Two factor Authentication through internal PIN code to login
- Buckets list from my Storj Account
- Files list from chosen bucket
- Take a photo with next uploading to one of the list of buckets
- Sort files/buckets (by date, by name)
- File Copying 
- Files/Buckets Grid View
- Files/Buckets List View
- File/Buckets Selection bar (to do an action with multiple files/buckets in one time)
- Search around buckets and files
- Billing to help user top up his Storj account Balance via STORJ and Bitcoins
- Mnemonic (secret phrase) generation
- Synchronization (from device to Storj)
- Multiple Synchronization options (When charging, Wi-Fi only, Sync optional folders, Sync cancellation, synchronization que)
- Changing Password

- Log Out


<a name="anchorProjStruct"></a>
## Project structure

The project consists of 3 main parts:
1. Cross-platform view implemented with [React-Native Framework](https://facebook.github.io/react-native/)
2. Source code for android devices, written in Java language
3. Source code for Ios devices, written in Objective-C language

Main functionality of source code for android and Ios devices:
1. Database layer
2. Background services for long-running operations, such as upload, download, synchronization of local files with Storj network
3. [Native modules](https://facebook.github.io/react-native/docs/native-modules-android.html)

<a name="anchorFront"></a>
### Frontend
We used React-native + Redux approach and tried to design our code in appropriate way.

Main parts of frondend structure:

**Containers** - container components connected with Store, incaplulates all client logic inside and provides all callbacks to the presentations components.

**Components** - presentations components, only concerned with how things look. Have no dependencies on the rest of the app, such as store, reducers or reducer actions.

**Reducers** - specify how the application's state changes in response to actions sent to the store. Also contains initial state of application.

**Navigators** - to implement navigation (tab navigation, stack navigators) we use [React Navigation](https://reactnavigation.org/) framework.

<a name="anchorAndroid"></a>
### Android 

Android part is written in Java language and its main modules are:

1. **dataprovider** - out database layer. This layer includes:
    - **data contracts** - entities, that describes correspondings tables.
    
    - **dbo** - Data base objects. Dbo - is an object that defines how the data will be sent to the database.
    
    - **repositories** - We use a repository to separate the logic that retrieves the data and maps it to the entity model from the         business logic that acts on the model.
    
    In our current implementation whe have 4 tables:
    
    -**Buckets** - stores already uploaded buckets and its metadata.
    
    -**Files**- stores already uploaded files metadata. Also stores thumbnail of downloaded/uploaded file as base64 String.
    
    -**UploadingFiles** - stores all uplaoding files. When uploading finish files will be removed and placed to the Files table.
    
    -**Settings** - stores all settings
    
    We use SQLite3 as local database.
    
2. **services** - list of our background services that executes long-running operations.
     
     - **ServiceModule** - entry point that is responsible for binding another services.
     - **FetchService** - updates buckets and files in background.
     - **UploadService** - service responsible for uploading files.
     - **DownloadService** - service responsible for downloading files.
     - **SynchronizationService** - service which handles SyncQueue.
     - **SynchronizationSchedulerJobService** - job service that takes difference between files in user folders and Storj and fills SyncQueue.
    
    **FetchService**
    
    ```
    void getBuckets()
    void getFiles(String bucketId)
    void createBucket(final String bucketName)
    void deleteBucket(final String bucketId)
     ```

    **UploadService**
    Has two worker threads for uploading files to Storj. One is for ordinary upload and another one is for synchronization     related upload and one thread for upload cancellation.
    Service module method for invoking ordinary file upload
    
     ```
    void uploadFile(String bucketId, String localPath, String fileName)
     ```
    
    **DownloadService**
    One worker thread for downloading files to device, one at a time. Also has a copy file method that downloads file from     one bucket and invoke upload to target bucket.
    Method in ServiceModule for invoking file downloading
    
     ```
    void downloadFile(String bucketId, String fileId, String localPath)
    void copyFile(String bucketId, String fileId, String localPath, String targetBucketId)
     ```
    
    **SynchronizationService**
    Handles sync queue and working with UploadService for invoking sync related upload and cancellation. Intent service       that process one request at a time. 
    Has few puplic methods in ServiceModule for sync start and cancel and for removing entrie from sync queue. StartSync      only process the sync queue but doesn't fill it with new entries.
    
     ```
    void startSync()
    void cancelSync()
    void removeFileFromSyncQueue(int id)
     ```
    
    **SynchronizationSchedulerJobService**
    Service that finds difference between user local files and Storj and fills sync Queue with new entries. Has no public     methods. Invoked directly by FirebaseJobDispatcher. On filling the queue starts SynchronizationService to process all     entries.
    
     Next methods of this service are called from frontend part to bind all services when application started.
     
     ```
    void bindGetBucketsService(Promise promise)
    void bindDownloadService(Promise promise)
     ```

<a name="anchorIos"></a>
###iOS

iOS part is written in Objective-C language and its main modules are:

1. **dataProvider** - out database layer. This layer includes:
    - **contracts** - entities, that describes correspondings tables.
    
    - **dbo** - Data base objects. Dbo - is an object that defines how the data will be sent to the database.
    
    - **repositories** - We use a repository to separate the logic that retrieves the data and maps it to the entity model from the business logic that acts on the model.
    
    In our current implementation whe have 4 tables:
    
    - **Buckets** - stores already uploaded buckets and its metadata.
    - **Files**- stores already uploaded files metadata. Also stores thumbnail of downloaded/uploaded file as base64 String.
    - **UploadingFiles** - stores all uplaoding files. When uploading finish files will be removed and placed to the Files table.
    - **SynchronizationQueue** - stores synchronization queue list.  
    - **Settings** - stores all settings.
    
    We use SQLite3 as local database with FMDB wrapper.
    
2. **services** - list of our 'background' services that executes long-running operations.
     
     - **STStorjBackgroundServices** - updates buckets and files in background.
     - **STUploadService** - service responsible for uploading files.
     - **STSyncService** - service which handles SyncQueue.
     - **STSyncScheduler** - job service that takes difference between files in user folders and Storj and fills SyncQueue.
    
    **STStorjBackgroundServices**
    
    ```
    -(void) getBuckets;
    -(void) getFiles:(NSString *) bucketId;
    -(void) createBucket:(NSString *)bucketName);
    -(void) deleteBucket(final String bucketId);
    -(void) deleteFileByBucketId:(NSString *) bucketId andWithFileId: (NSString *) fileId);
    ```

    **STUploadService**
    Has two worker threads for uploading files to Storj. One is for ordinary upload and another one is for synchronization     related upload and one thread for upload cancellation.
    Service module method for invoking ordinary file upload
    
     ```
	-(void) uploadFileWithBucketId: (NSString *) bucketId
	                      fileName: (NSString *) fileName
   		                  localPath: (NSString *) localPath;

	-(void) syncFileWithSyncEntryId: (int) syncEntryId
       	                bucketId: (NSString *) bucketId
          	             fileName: (NSString *) fileName
             		         localPath: (NSString *) localPath;

	-(void) cancelSyncEntry: (int) syncEntryId;

	-(void) clean;
     ```
    
    **STSyncService**
    Handles sync queue and working with STUploadService for invoking sync related upload and cancellation. Intent service       that process one request at a time. 
    Has few puplic methods in ServiceModule for sync start and cancel and for removing entrie from sync queue. StartSync only process the sync queue but doesn't fill it with new entries.
    
     ```
	   -(void) startSync;

		-(void) stopSync;

		-(void) removeFileFromSyncQueue: (int) syncEntryId;

		-(void) clean;
     ```
    
    **STSyncScheduler**
    Service that finds difference between user local files and Storj and fills sync Queue with new entries. Runs on application start and fills sync Queue in case if user granted all neccessary permissions, logged in and enabled Synchronization. On filling the queue starts SynchronizationService to process all     entries.
     
     ```
		-(void) scheduleSync;

		-(void) startSyncDelayed;

		-(void) cancelSchedule;
     ```


<a name="anchorIssues"></a>
## Issues

1. ### File upload
If you will try to upload large file - be sure that your device has enough free RAM. During uploadin your file will bw encrypted and splitted on chunks and will be placed in virtual memory of your device. So you should have enough free RAM. In other case - application will be crashed.

2. ### File download

If your device doesn't have enough free space on its drive and you will try to upload large file - downloading process will stuck. But you will be able to cancel file downloading.

<a name="anchorTutorials"></a>
## Step by step tutorials

<a name="anchorAndroidTutorial"></a>
1. ### Android

In this tutorial we will show you how to use storjlib in native android application.
We will use Android Studio, Java lang and Ubuntu 18 machine.

1. Create new application.
Lets open android studio and create new application, called MyStorjApp.
In Target Android Devices select Android API 25: Android 7.1.1 (Nougat).
Next select Basic Activity pattern.

2. Add libstorj-android dependency to build.gradle (Module:app)
After adding it should looks like:

```Gradle
dependencies {
    implementation 'io.storj:libstorj-android:0.7.2'
    ...
}
```

If you are using older versions of Android it could be a bit different. For example:

```Gradle
dependencies {
    compile 'io.storj:libstorj-android:0.7.2'
    ...
}
```

After this press File -> Sync project with gradle files

Also add next line to your AndroidManifest.xml

```XML
    <uses-permission android:name="android.permission.INTERNET" />
```

3. Implementation

We have already attach android-libstorj lib to our project, so lets start implementing simple module with basic functionality.

Create new package called StorjLibModule.

You can read detailed api description in API section

3.1 Registration flow


Create new class with the RegisterModule name there.

````java
package StorjModule;

import android.content.Context;
import android.os.Process;

import io.storj.libstorj.Keys;
import io.storj.libstorj.KeysNotFoundException;
import io.storj.libstorj.RegisterCallback;
import io.storj.libstorj.Storj;
import io.storj.libstorj.android.StorjAndroid;

public class RegisterModule {

    private final Context _context;

    public RegisterModule(Context context) {
        _context = context;
    }

    private Storj getStorj() {
        return StorjAndroid.getInstance(_context);
    }

    public String generateMnemonic() {
            return Storj.generateMnemonic(256);
    }

    public boolean checkMnemonic(String mnemonic) {
        return Storj.checkMnemonic(mnemonic);
    }

    public boolean verifyKeys(String email, String password) {
        int result;

        try {

            result = getStorj().verifyKeys(email, password);
        } catch(InterruptedException ex) {

            return false;
        }

        return result == 0;
    }

    public boolean keysExists() {
        return getStorj().keysExist();
    }

    public boolean importKeys(String email, String password, String mnemonic, String passcode) {
        return getStorj().importKeys(new Keys(email, password, mnemonic), passcode);
    }

    public boolean deleteKeys() {
        return getStorj().deleteKeys();
    }

    public Keys getKeys(String passcode) {
        return getStorj().getKeys(passcode);
    }

    public void register(final String email, final String password, final RegisterCallback callback) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                if(Process.getThreadPriority(0) != Process.THREAD_PRIORITY_BACKGROUND) {
                    Process.setThreadPriority(Process.THREAD_PRIORITY_BACKGROUND);
                }

                try {
                    getStorj().register(email, password, callback);
                }
                catch (KeysNotFoundException error) {

                }
                catch(Exception error) {

                }
            }
        }).start();
    }
}
````

````java
private Storj getStorj() {
        return StorjAndroid.getInstance(_context);
    }
````
this method is used to initialize and get Storj context. This context is needed to call non-static of methods.
Storj context is a Singleton.

First of all we should create an account.

````java
public boolean register(final String login, final String password)
````
This method requires RegisterCallback. So let implement this interface in our Activity.

Create new Activity, called RegisterActivity

````java
package com.mystorjappl.mystorjapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import StorjModule.RegisterModule;
import io.storj.libstorj.RegisterCallback;

public class RegisterActivity extends AppCompatActivity implements RegisterCallback {

    private RegisterModule mRegisterModule;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        mRegisterModule = new RegisterModule(this);
    }

    public void register() {
        mRegisterModule.register("myEmail@test.com", "123123", this);
    }

    @Override
    public void onConfirmationPending(String email) {
        //Show some notifications here or change activity state
    }

    @Override
    public void onError(int code, String message) {
        //Show some notifications here or change activity state
    }
}

````


this method could block ui so let call it in a new thread. After success registration you will receive an email with confirmation link, to finish registration.

After creating an account you are able to login (create keys)

To create keys you should use 

````java
public boolean importKeys(String email, String password, String mnemonic, String passcode)
````

To generate and check mnemonic use next methods:

````java
public boolean checkMnemonic(String mnemonic)
public String generateMnemonic()
````

To check if your account exists you can use 

````java
public boolean verifyKeys(String email, String password)
````
To receice your email, password and mnemonic use

````java
    public Keys getKeys(String passcode)
````
This method will return new Key object with all needed info.

To delete your keys (for log out functionality, for example), you can use:

````java
public boolean deleteKeys()
````

3.2 Bucket flow

Lets create new module that will implement all bucket functionality.

````java
package StorjModule;

import android.content.Context;

import io.storj.libstorj.Bucket;
import io.storj.libstorj.CreateBucketCallback;
import io.storj.libstorj.DeleteBucketCallback;
import io.storj.libstorj.GetBucketsCallback;
import io.storj.libstorj.KeysNotFoundException;
import io.storj.libstorj.Storj;
import io.storj.libstorj.android.StorjAndroid;

public class BucketsModule {

    private final Context _context;

    private Storj getStorj() {
        return StorjAndroid.getInstance(_context);
    }

    public BucketsModule (Context context) {
        _context = context;
    }

    public void createBucket(final String bucketName, final CreateBucketCallback callback) {

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    getStorj().createBucket(bucketName, callback);
                } catch (KeysNotFoundException error) {

                }
            }
        }).start();
    }

    public void getBuckets(final GetBucketsCallback callback) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    getStorj().getBuckets(callback);
                } catch (KeysNotFoundException error) {

                }
            }
        }).start();
    }

    public void deleteBucket(final String bucketId, final DeleteBucketCallback callback) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    getStorj().deleteBucket(bucketId, callback);
                } catch (KeysNotFoundException error) {

                }
            }
        }).start();
    }
}


````

And lets create new Activity that will implement all needed callbacks

````java
package com.mystorjappl.mystorjapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import StorjModule.BucketsModule;
import StorjModule.RegisterModule;
import io.storj.libstorj.Bucket;
import io.storj.libstorj.CreateBucketCallback;
import io.storj.libstorj.DeleteBucketCallback;
import io.storj.libstorj.GetBucketsCallback;

public class BucketActivity extends AppCompatActivity implements CreateBucketCallback, GetBucketsCallback, DeleteBucketCallback {
    
    private BucketsModule mBucketsModule;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bucket);

        mBucketsModule = new BucketsModule(getApplicationContext());

        mBucketsModule.getBuckets(this);
    }

    @Override
    public void onBucketCreated(Bucket bucket) {

    }

    @Override
    public void onBucketDeleted(String bucketId) {

    }

    @Override
    public void onError(String bucketName, int code, String message) {

    }

    @Override
    public void onBucketsReceived(Bucket[] buckets) {

    }

    @Override
    public void onError(int code, String message) {

    }
}

````

2. ### IOS
<a name="anchorRnTutorial"></a>
3. ### React-native

In this tutorial we will show you how to use storjlib in React-native android application. We will use Android Studio, Java lang for Android part, Objective-c for IOS part and javascript.

1. Create new application. 

First, run in your command line:

react-native init AwesomeProject


2. Implement Storj functionality

To do this we should implement native modules for android and IOS.

Let's create native for android.

Open your android folder and create new package called StorjLibModule.

Create new class called BucketsModule that extends ReactContextBaseJavaModule

````java
package com.storjlibmodule;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import io.storj.libstorj.Storj;
import io.storj.libstorj.android.StorjAndroid;

public class BucketsModule extends ReactContextBaseJavaModule {

    private Storj getStorj() {
        return StorjAndroid.getInstance(getReactApplicationContext());
    }

    @Override
    public String getName() {
        return "BucketsModule";
    }

    public BucketsModule (ReactApplicationContext reactContext) {
        super(reactContext);
    }
    
}

````
Then let`s make ReactMethod in BucketsModule, for example createBucket from StorjAndroid and add related imports:

````java
...another imports here...
import com.facebook.react.bridge.ReactMethod;

import io.storj.libstorj.CreateBucketCallback;
import io.storj.libstorj.KeysNotFoundException;


public class BucketsModule extends ReactContextBaseJavaModule {
	.........
	
	@ReactMethod
	    public void createBucket(final String bucketName, final CreateBucketCallback callback) {

		new Thread(new Runnable() {
		    @Override
		    public void run() {
			try {
			    getStorj().createBucket(bucketName, callback);
			} catch (KeysNotFoundException error) {

			}
		    }
		}).start();
    	}
}

````

Then we need to create package that implements ReactPackage

````java

package com.our_app;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.storjlibmodule.BucketsModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class OurTestPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new BucketsModule(reactContext));

        return modules;
    }

}

````

Finally, we need to add our package in MainApplication gerPackages() method:

````java

@Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new OurTestPackage()
      );
    }

````

And we can successfully use our module in JavaScript by importing NativeModules from react-native package: 

````js

import { NativeModules } from 'react-native';

NativeModules.BucketsModule.createBucket('bucketName');

````
