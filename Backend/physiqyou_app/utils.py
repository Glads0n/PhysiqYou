def calculate_plan(profile):

    age = profile.age
    height = profile.height
    weight = profile.current_weight
    gender = profile.gender
    activity = profile.activity_level
    goal = profile.goal_type

    # -------- BMR --------
    if gender == "male":
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    else:
        bmr = 10 * weight + 6.25 * height - 5 * age - 161


    # -------- Activity Multiplier --------
    activity_multipliers = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "very": 1.725,
        "extreme": 1.9
    }

    tdee = bmr * activity_multipliers.get(activity, 1.2)


    # -------- Goal Adjustment --------
    if goal == "lose":
        target_calories = tdee - 500
        burn_target = 500

    elif goal == "gain":
        target_calories = tdee + 500
        burn_target = 300

    else:
        target_calories = tdee
        burn_target = 400


    # -------- Expected Weeks --------
    weight_diff = abs(profile.current_weight - profile.target_weight)

    if profile.weight_change_pace > 0:
        expected_weeks = round(weight_diff / profile.weight_change_pace, 1)
    else:
        expected_weeks = 0


    return {
        "daily_calories": round(target_calories),
        "daily_burn": burn_target,
        "expected_weeks": expected_weeks
    }