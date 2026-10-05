// referral.js
// Tracks which manager and platform referred a visitor.
// Example: https://sheemetalksmoney.com/?ref=MrsGold-TT

(function () {
    const params = new URLSearchParams(window.location.search);
    const referralId = params.get("ref");

    // Preserve previous attribution when no referral is provided.
    if (!referralId) {
        console.log("No new referral ID found.");
        return;
    }

    if (typeof managers === "undefined") {
        console.error("Referral tracking: managers.js must load first.");
        return;
    }

    function findReferral(refId) {
        for (const managerKey of Object.keys(managers)) {
            const manager = managers[managerKey];

            for (const platformName of Object.keys(manager.platforms)) {
                const platform = manager.platforms[platformName];

                if (platform.id === refId) {
                    return {
                        managerKey: managerKey,
                        managerId: manager.id,
                        managerName: manager.name,
                        platform: platformName,
                        platformId: platform.id,
                        handle: platform.handle || "",
                        profileUrl: platform.url || ""
                    };
                }
            }
        }

        return null;
    }

    const referral = findReferral(referralId);

    // Invalid referrals do not overwrite previous attribution.
    if (!referral) {
        console.warn("Invalid referral ID:", referralId);
        return;
    }

    try {
        localStorage.setItem("stm_referral_id", referral.platformId);
        localStorage.setItem("stm_manager_id", referral.managerId);
        localStorage.setItem("stm_manager_name", referral.managerName);
        localStorage.setItem("stm_platform", referral.platform);
        localStorage.setItem("stm_platform_handle", referral.handle);
        localStorage.setItem(
            "stm_referral_timestamp",
            new Date().toISOString()
        );
    } catch (error) {
        console.error("Could not save referral attribution:", error);
        return;
    }

    console.log("Referral successfully captured:", {
        referralId: referral.platformId,
        manager: referral.managerName,
        managerId: referral.managerId,
        platform: referral.platform,
        handle: referral.handle
    });
})();