//
//  STBucketModel.m
//  StorjMobile
//
//  Created by Bogdan Artemenko on 3/19/18.
//  Copyright © 2018 Storj. All rights reserved.
//

@import StorjIOS;
#import "STBucketModel.h"
#import "BucketContract.h"

#import "DictionaryUtils.h"

@implementation STBucketModel

@synthesize _id;
@synthesize _name;
@synthesize _created;
@synthesize _hash;
@synthesize _isDecrypted;
@synthesize _isStarred;

-(instancetype) initWithId:(NSString *)bucketId
                      name:(NSString *)bucketName
                   created:(NSString *)created
                      hash:(long)hash
               isDecrypted:(BOOL)isDecrypted
{
  return [self initWithId:bucketId
                     name:bucketName
                  created:created
                     hash:hash
              isDecrypted:isDecrypted
                isStarred:NO];
}

-(instancetype) initWithId:(NSString *)bucketId
                      name:(NSString *)bucketName
                   created:(NSString *)created
                      hash:(long)hash
               isDecrypted:(BOOL)isDecrypted
                 isStarred:(BOOL)isStarred
{
  if(self = [super init]){
    _id = bucketId;
    _name = bucketName;
    _created = created;
    _hash = hash;
    _isDecrypted = isDecrypted;
    _isStarred = isStarred;
  }
  return self;
}

-(instancetype) initWithStorjBucketModel : (SJBucket *) sjBucket{
  return [self initWithId: [sjBucket _id]
                     name: [sjBucket name]
                  created: [sjBucket created]
                     hash: [sjBucket _hash]
              isDecrypted: [sjBucket _isDecrypted]];
}

-(BOOL) isValid{
  return [DictionaryUtils isNSStringValid:_id] &&
    [DictionaryUtils isNSStringValid:_name] &&
    [DictionaryUtils isNSStringValid:_created];
}

-(NSDictionary *)toDictionary{
  NSMutableDictionary *object = [[NSMutableDictionary alloc] init];
  [object setObject: [DictionaryUtils checkAndReturnNSString:_id] forKey:BucketContract.ID];
  [object setObject: [DictionaryUtils checkAndReturnNSString:_name] forKey:BucketContract.NAME];
  [object setObject: [DictionaryUtils checkAndReturnNSString:_created] forKey:BucketContract.CREATED];
  [object setObject: @(_hash) forKey:BucketContract.HASH_CODE];
  [object setObject: @(_isDecrypted) forKey:BucketContract.DECRYPTED];
  [object setObject: @(_isStarred) forKey:BucketContract.STARRED];
  return object;
}

@end
