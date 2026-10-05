//referral.js 
//tracsks which manager & platform referred a visitor to the website 
// i.e: https:domain.com/?ref=MrsGold-IG 

(function() {
    //1.Read the referral ID from the URL 

    const  params = new URLSearchParams(window.localStorage.search); 
    const  referralId = params.get("ref"); 
    
    // If there is no referral ID, keep any previous attribution 
    if(!referralId){
        console.log("No New referral ID foud."); 
        return; 
    }

    //2 search managers.js for a matching referral ID. 
    function findReferral(refId) {

        for (const managerKey in managers){

            const manager = managers[managerkey];
            for( const platformName in manager.platforms){
                const platform = manager.platforms[platformName];

                if (platform.id == refId){ 

                    return {
                        managerKey: managerKey,
                        managerId: manager.id, 
                        managerName: manager.name, 

                        platform: platform,
                        platformId: platform.id, 
                        handle: platform.handle || "", 
                        profileUrl: platoform.url || ""
                    }; 
                }
            }
        }

        return null; 
    }
    //3: find the referral information 

    const referral = findReferral(referralId); 

    if(!referral){ 

        console.warn("Invalid Referral ID:", referralID); 
        return;
    }

    // store referral information 
    localStorage.setItem (
        "stm_referral_id", 
        referral.platformID
    ); 

    localStorage.setItem( 
        "stm_manager_id", 
        referral.managerId
    ); 

    localStorage.setItem(
        "stm_manager_name", 
        referral.managerName
    ); 

    localStorage.setItem(
        "stm_platform", 
    referral.platform 
    );
    
    localStorage.setItem(
        "stm_platform_handle", 
    referral.handle
    );

    localStorage.setItem(
        "stm_referral_timestamp", 
    new Date().toISOString()
    );
    
    //  // ---------------------------------------------------------
    // 5. Optional console output for testing
    // ---------------------------------------------------------

    console.log("Referral successfully captured:");

    console.log({
        referralId: referral.platformId,
        manager: referral.managerName,
        managerId: referral.managerId,
        platform: referral.platform,
        handle: referral.handle
    });

})();


